const express = require("express");
const router = express.Router();
const {
  getTickets,
  getSingleTicket,
  createTicket,
  deleteSingleTicket,
  updateSingleTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const noteRouter = require("./noteRoutes");

//re-route into note router
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteSingleTicket)
  .put(protect, updateSingleTicket);
module.exports = router;
