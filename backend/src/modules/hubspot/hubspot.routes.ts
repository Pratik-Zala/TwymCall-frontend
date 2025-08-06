import { Router } from "express";
import axios from "axios";

const router = Router();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

const hubspotClient = axios.create({
  baseURL: "https://api.hubapi.com",
  headers: {
    Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  },
});

router.get("/imports", async (req, res) => {
  try {
    const { data } = await hubspotClient.get("/crm/v3/imports/");
    res.json({
      message: "Successfully fetched imports from HubSpot",
      imports: data,
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

export default router; 