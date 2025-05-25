import pb from "./pb";

const RECORD_ID = "attempts"; // use your real record ID here if it's different

export const getGlobalAttempts = async (): Promise<number> => {
  const record = await pb.collection("stats").getOne(RECORD_ID);
  return record.attempts || 0;
};

export const incrementGlobalAttempts = async (): Promise<number> => {
  const current = await getGlobalAttempts();
  const updated = await pb.collection("stats").update(RECORD_ID, {
    attempts: current + 1,
  });
  return updated.attempts;
};
