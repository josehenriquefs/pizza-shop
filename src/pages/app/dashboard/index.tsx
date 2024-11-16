import { Helmet } from "react-helmet-async";
import { DayOrdersAmountCard } from "./components/DayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./components/MonthCanceledOrdersAmount";
import { MonthOrderAmountCard } from "./components/MonthOrderAmountCard";
import { MonthRevenueCard } from "./components/MonthRevenueCard";
import { PopularProductsChart } from "./components/PopularProductsChart";
import { RevenueChart } from "./components/RevenueChart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrderAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
