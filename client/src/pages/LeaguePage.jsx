import HomeContent from '@/components/organisms/HomeContent'
import LeagueContent from '@/components/organisms/league/LeagueContent'
import Navbar from '@/components/organisms/navigation/Navbar'
import LeftPanel from '@/components/organisms/panels/LeftPanel'
import RightPanel from '@/components/organisms/panels/RightPanel'
import { BetsProvider } from '@/context/betsContext'
import React from 'react'

const LeaguePage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <BetsProvider>
      <main className="min-w-[1024px] h-full w-full pt-[75px] grid grid-cols-8 lg:grid-cols-9 ">
        <section className="col-span-2 lg:col-span-2">
          <LeftPanel />
        </section>
        <section className="col-span-4 lg:col-span-5 px-4 lg:px-2">
          <LeagueContent />
        </section>
        <section className="col-span-2 lg:col-span-2">
          <RightPanel />
        </section>
      </main>
      </BetsProvider>
    </div>
  )
}

export default LeaguePage