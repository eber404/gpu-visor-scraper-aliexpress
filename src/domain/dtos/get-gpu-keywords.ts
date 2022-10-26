import { Err, Ok, Result } from "oxide.ts";
import { z } from "zod";

const keywords = z.array(z.string().min(1));

export type Keywords = z.infer<typeof keywords>;

export function KeywordsDto(props: Keywords): Result<Keywords, Error> {
  const res = keywords.safeParse(props);

  return res.success ? Ok(props) : Err(res.error);
}
