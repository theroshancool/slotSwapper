import Event from "../models/eventModel.js";


// create event
export const createEvent = async (req, res) => {
    const {title, startTime, endTime, status } = req.body;
    const event = await Event.create({title, startTime, endTime, status, userId: req.user._id});
    res.json(event);
};

// get my event
export const getMyEvents = async (req, res) => {
    const events = await Event.find({userId: req.user._id});
    res.json(events);
};

// update event
export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event || event.userId.toString() !== req.user._id.toString())
    return res.status(404).json({ message: "Event not found or unauthorized" });

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
};

// delet event
export const deleteEvent = async (req, res ) => {
    const event = await Event.findById(req.params.id);
    if (!event || event.userId.toString() !== req.user._id.toString())
        return res.status(404).json({message: "Event not found or unauthorized"});

    await event.deleteOne();
    res.json({message: "Event Deleted"});
};