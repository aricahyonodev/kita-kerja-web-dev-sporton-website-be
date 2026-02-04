import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedItem{
    productId: mongoose.Types.ObjectId;
    qty: number;
}
export interface ITransaction extends Document{
    paymentProof: string;
    status: "pending" | "paid" | "rejected";
    purchasedItems: IPurchasedItem[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string;
}

const PurchasedItemsSchema: Schema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product",require: true},
  qty: { type: Number, require: true, min: 1},
},{_id: false});

const TransactionSchema: Schema = new Schema(
  {
    paymentProof: { type: String, require: true },
    status: {
      type: String,
      require: true,
      default: "pending",
      enum: ["pending", "paid", "rejected"],
    },
    purchasedItems: { type: [PurchasedItemsSchema], require: true },
    totalPayment: { type: String, require: true },
    customerName: { type: String, require: true },
    customerContact: { type: String, require: true },
    customerAddress: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);