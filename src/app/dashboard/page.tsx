import AddFamily from "@/components/dashboard/addFamily";
import FamilyCard from "@/components/dashboard/familyCard";

export default function Dashboard() {
    return (
    <div>
      <div className="flex justify-between px-4">
      <p className="font-bold text-2xl">FAMILYS</p>
        <AddFamily />
      </div>
      <div className="grid grid-cols-4 px-4 gap-4 mt-4">
        <FamilyCard/>
      </div>
    </div>
  );
}
