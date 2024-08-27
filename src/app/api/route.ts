import { parse } from "node-html-parser";

export async function GET(request: Request) {
  const res = await fetch("https://sjp.pl/sl/growe/?p=a&l=7");
  const html = parse(await res.text());

  const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());
  const length = parseInt(params.length ?? "5");

  const words = html
    .querySelectorAll("a[target=_blank]")
    .map((word) => word.text)
    .filter((word) => word.length === length);

  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  return Response.json({ word: randomWord ?? "" });
}
