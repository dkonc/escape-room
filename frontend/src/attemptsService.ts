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

export const incrementRoom2Hint = async (): Promise<number> => {
  const record = await pb.collection("stats").getOne("room2hint");
  const updated = await pb.collection("stats").update("room2hint", {
    attempts: (record.attempts || 0) + 1,
    updated: new Date().toISOString(),
  });
  return updated.count;
};

export const incrementRoom1Hint = async (): Promise<number> => {
  const record = await pb.collection("stats").getOne("room1hint");
  const prev = Array.isArray(record.hintTimes) ? record.hintTimes : [];
  const now = new Date().toISOString();
  const updated = await pb.collection("stats").update("room1hint", {
    attempts: (record.attempts || 0) + 1,
    updated: now,
    hintTimes: [...prev, now],
  });
  return updated.attempts;
};
