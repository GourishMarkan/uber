import mongoose from "mongoose";

const blacklistTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timeStamps: true }
);

blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

export const BlacklistToken = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema
);
