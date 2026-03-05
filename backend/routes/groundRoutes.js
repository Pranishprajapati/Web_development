import express from "express";
import pool from "../config/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Serve uploads folder statically
router.use("/uploads", express.static("uploads"));

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM grounds ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch grounds" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM grounds WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Ground not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch ground" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, location, rating, price_per_hour, facilities } = req.body;
    const imagePath = req.file ? "/" + req.file.path.replace(/\\/g, "/") : null;

    const result = await pool.query(
      `INSERT INTO grounds (name, location, rating, price_per_hour, facilities, image)
       VALUES ($1, $2, $3, $4, $5::text[], $6)
       RETURNING *`,
      [name, location, rating || 0, price_per_hour, facilities ? facilities.split(",").map(f => f.trim()) : [], imagePath]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add ground" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, location, rating, price_per_hour, facilities } = req.body;
    const { id } = req.params;
    const imagePath = req.file ? "/" + req.file.path.replace(/\\/g, "/") : null;

    let query = `
      UPDATE grounds SET
        name=$1,
        location=$2,
        rating=$3,
        price_per_hour=$4,
        facilities=$5::text[]
    `;
    const values = [name, location, rating || 0, price_per_hour, facilities ? facilities.split(",").map(f => f.trim()) : []];

    if (imagePath) {
      query += ", image=$6 WHERE id=$7 RETURNING *";
      values.push(imagePath, id);
    } else {
      query += " WHERE id=$6 RETURNING *";
      values.push(id);
    }

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update ground" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM grounds WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Ground not found" });
    res.json({ message: "Ground deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete ground" });
  }
});

export default router;