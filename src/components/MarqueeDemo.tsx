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
    img: "src/assets/sql-server.png",
  },
  
];

const firstRow = reviews;
// const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  // name,
  // username,
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
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex  h-20 flex-row justify-center items-center gap-4">
        <img className="rounded-full" width="70" height="70" alt="fuck" src={img}/>
        {/* <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div> */}
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
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
