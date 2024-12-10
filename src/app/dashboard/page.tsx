import AddFamily from "@/components/dashboard/addFamily";
import FamilyCard from "@/components/dashboard/familyCard";

export default function Dashboard() {
    return (
    <div>
      <div className="flex justify-between px-4">
      <p className="font-bold text-2xl">FAMILYS</p>
        <AddFamily />
      </div>
      <div className="m-4">
        <FamilyCard/>
      </div>
    </div>
  );
}
