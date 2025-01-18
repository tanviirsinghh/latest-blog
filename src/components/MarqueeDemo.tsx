import { cn } from "../lib/utils";
import {Marquee} from "../components/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "React Js",
    img: "src/assets/react.png",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Typescript",
    img: "src/assets/typescript.png",
  },
  {
    name: "John",
    username: "@john",
    body: "CSS Library",
    img: "src/assets/tailwind.png"
  },
  {
    name: "Jane",
    username: "@jane",
    body: " For Custom Package",
    img: "src/assets/npm.svg",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Serverless BackEnd",
    img: "src/assets/cloudflare.svg",
  },
  {
    name: "James",
    username: "@james",
    body: "Backend Language",
    img: "src/assets/hono.png",
  },
  {
    name: "James",
    username: "@james",
    body: "UI Library",
    img: "src/assets/aceternity.png",
  }
  ,
  {
    name: "James",
    username: "@james",
    body: "O R M",
    img: "src/assets/prismaorm.png",
  },{
    name: "James",
    username: "@james",
    body: " SQL Database",
    img: "./src/assets/sql-server.png",
  },
  
];

const firstRow = reviews;
const ReviewCard = ({
  img,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-32 cursor-pointer overflow-hidden rounded-sm  m-6",
      )}
    >
      <div className="flex  h-20 flex-row justify-center items-center gap-4">
        <img className="rounded-full" width="70" height="70" alt="img" src={img}/>
      </div>
      <blockquote className="mt-2 font-mono text-sm text-center ">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
