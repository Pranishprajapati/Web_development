import pool from "../config/db.js";

// Get all grounds
export const getAllGrounds = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM grounds ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single ground by ID
export const getGroundById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM grounds WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Ground not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
