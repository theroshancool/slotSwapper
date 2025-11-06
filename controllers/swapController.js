import Event from "../models/eventModel.js"
import swapRequest from "../models/swapRequest.js"


export const getSwappableSlots = async (req, res) => {
  const slots = await Event.find({
    status: "SWAPPABLE",
    userId: { $ne: req.user._id },
  }).populate("userId", "name email");
  res.json(slots);
};


export const createSwapRequest = async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;

  const mySlot = await Event.findById(mySlotId);
  const theirSlot = await Event.findById(theirSlotId);

  if (!mySlot || !theirSlot) return res.status(404).json({ message: "Slot not found" });
  if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE")
    return res.status(400).json({ message: "One or both slots are not swappable" });

  const swapRequest = await SwapRequest.create({
    requester: req.user._id,
    receiver: theirSlot.userId,
    mySlot: mySlot._id,
    theirSlot: theirSlot._id,
  });

  mySlot.status = "SWAP_PENDING";
  theirSlot.status = "SWAP_PENDING";
  await mySlot.save();
  await theirSlot.save();

  res.json(swapRequest);
};


export const respondToSwap = async (req, res) => {
    const { accepted } = req.body;
    const swap = await SwapRequest.findById(req.params.id)
    .populate("mySlot")
    .populate("theirSlot");

    if (!swap) return res.status(404).json({message: "Swap request not found"});

    const { mySlot, theirSlot } = swap;

    if (accepted) {
        swap.status = "ACCEPTED";

        // swap ownership

        const tempOwner = mySlot.userId;
        mySlot.userId = theirSlot.userId;
        theirSlot.userId = tempOwner;


        mySlot.status = "BUSY";
        theirSlot.status = "BUSY";

        await mySlot.save();
        await thrielot.save();
    } else {
        swap.status = "REJECTED";
        mySlot.status = "SWAPPABLE";
        theirSlot.status = "SWAPPABLE";
        await mySlot.save();
        await theirSlot.save();
    }

    await swap.save();
    res.json(swap);
}