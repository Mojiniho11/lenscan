import Image from "next/image"
import Link from "next/link"

import { getTotalApps } from "@/app/api/analystics/topapps/getAppStats"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default async function AppsSummary() {
  // recommend apps list
  const recommendApps = [
    {
      name: "Orb",
      description:
        "Mobile experience with a focus on creators and communities ",
      icon: "/apps/orb.png",
      url: "https://orb.ac",
    },
    {
      name: "Buttrfly",
      description: "Web3 Social Explorer",
      icon: "/apps/buttrfly.png",
      url: "https://buttrfly.app/",
    },
    {
      name: "T2",
      description: "Where writers find their niche",
      icon: "/apps/t2.png",
      url: "https://t2.world/",
    },
    {
      name: "Hey",
      description: "Open source platform for desktop",
      icon: "/apps/hey.png",
      url: "https://hey.xyz/",
    },
    {
      name: "Tape",
      description: "Open-source video platform for desktop",
      icon: "/apps/tape.png",
      url: "https://tape.xyz",
    },
    {
      name: "Dumpling",
      description: "Streaming and steaming the best content from Lens",
      icon: "/apps/dumpling.png",
      url: "https://www.dumpling.lol/",
    },
  ]
  const totalApps = await getTotalApps()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Discover Apps</h2>
        <span className="tracking-tight text-muted-foreground">
          There are a total of
          <span className="ml-1 text-xl font-bold">{totalApps}</span> apps on
          Lens. Check out some of the most popular apps below.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {recommendApps.map((app) => (
          <Card key="1" className="w-full">
            <CardContent className="flex items-center p-4 sm:flex-row">
              <Image
                alt="Orb logo"
                className="h-15 w-15 aspect-[60/60] rounded-md object-cover"
                height="60"
                width="60"
                src={app.icon}
              />
              <div className="ml-4 mr-8 flex flex-grow flex-col sm:gap-0">
                <span className="text-lg font-bold">{app.name}</span>
                <span
                  className="text-sm"
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {app.description}
                </span>
              </div>
              <Link
                href={app.url}
                passHref
                className="flex flex-grow justify-end"
                target="_blank"
              >
                <Button className="hidden md:inline-block">VISIT</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
