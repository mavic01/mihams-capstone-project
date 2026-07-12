import DashboardMainContent from "./DashboardMainContent";
import DashboardWidgetPanel from "./DashoardWidgetPanel"

const DashboardHome = () => {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4">

            <DashboardMainContent />

            <DashboardWidgetPanel />
        </div>
    );
};

export default DashboardHome;