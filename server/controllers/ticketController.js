const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get  user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Get  user tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: "new",
  });
  res.status(201).json(ticket);
});

// @desc Get  user ticket
// @route GET /api/tickets/:id
// @access Private
const getSingleTicket = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }
  res.status(200).json(ticket);
});

// @desc Delete  user ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteSingleTicket = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  await ticket.deleteOne();
  res.status(200).json({ message: "Ticket deleted" });
});

// @desc update  user ticket
// @route PUT /api/tickets/:id
// @access Private
const updateSingleTicket = asyncHandler(async (req, res) => {
  // Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});
module.exports = {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteSingleTicket,
  updateSingleTicket,
};
