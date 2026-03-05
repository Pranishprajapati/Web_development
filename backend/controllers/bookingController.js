import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  const { user_id, name, email, phone, date, fromTime, toTime, groundName } = req.body;

  if (!user_id || !name || !email || !phone || !date || fromTime === undefined || toTime === undefined || !groundName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fromHour = parseInt(fromTime);
    const toHour = parseInt(toTime);

    if (toHour <= fromHour) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "End time must be after start time" });
    }

    // Get ground info
    const groundRes = await client.query(
      "SELECT id, price_per_hour FROM grounds WHERE name ILIKE $1",
      [groundName.trim()]
    );

    if (groundRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Ground not found" });
    }

    const groundId = groundRes.rows[0].id;
    const price = parseFloat(groundRes.rows[0].price_per_hour);
    const totalPrice = (toHour - fromHour) * price;

    const lockRes = await client.query(
      `SELECT * FROM bookings_direct
       WHERE ground_id = $1 AND booking_date = $2
       FOR UPDATE`,
      [groundId, date]
    );

    // Check overlap
    const overlap = lockRes.rows.some(
      (b) => fromHour < b.to_time && toHour > b.from_time
    );

    if (overlap) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Selected time slot is already booked ⚠️" });
    }

    // Insert booking
    const insertRes = await client.query(
      `INSERT INTO bookings_direct
       (user_id, name, email, phone, booking_date, from_time, to_time, ground_id, ground_name, price, total_price, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending')
       RETURNING *`,
      [user_id, name, email, phone, date, fromHour, toHour, groundId, groundName, price, totalPrice]
    );

    await client.query("COMMIT");

    res.status(201).json({ message: "Booking successful! ⚽", booking: insertRes.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    client.release();
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         b.*, 
         u.name AS user_name, 
         u.email AS user_email
       FROM bookings_direct b
       LEFT JOIN users u ON b.user_id = u.id
       ORDER BY b.booking_date DESC, b.from_time ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("FETCH BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM bookings_direct
       WHERE user_id = $1
       ORDER BY booking_date DESC, from_time ASC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("FETCH USER BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status is required" });

  try {
    const result = await pool.query(
      `UPDATE bookings_direct SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Status updated successfully ✅", booking: result.rows[0] });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAvailableHours = async (req, res) => {
  const { ground_id, date } = req.query;
  if (!ground_id || !date) return res.status(400).json({ availableHours: [] });

  try {
    const bookedRes = await pool.query(
      `SELECT from_time, to_time FROM bookings_direct
       WHERE ground_id=$1 AND booking_date=$2`,
      [ground_id, date]
    );

    // All possible booking hours: 6AM - 10PM
    let hours = Array.from({ length: 17 }, (_, i) => i + 6);

    // Remove booked hours
    bookedRes.rows.forEach(b => {
      for (let h = b.from_time; h < b.to_time; h++) {
        hours = hours.filter(hour => hour !== h);
      }
    });

    res.json({ bookedHours: bookedRes.rows, availableHours: hours });
  } catch (err) {
    console.error("AVAILABLE HOURS ERROR:", err);
    res.status(500).json({ bookedHours: [], availableHours: [] });
  }
};