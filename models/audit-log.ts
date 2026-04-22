import { Schema, model, models } from "mongoose";

const auditLogSchema = new Schema(
  {
    actorId: { type: String, required: true },
    action: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    channel: { type: String, default: "web" }
  },
  {
    timestamps: true,
    collection: "audit_logs"
  }
);

export const AuditLog = models.AuditLog || model("AuditLog", auditLogSchema);
