import AddFamily from "@/components/dashboard/addFamily";
import FamilyCard from "@/components/dashboard/familyCard";

export default function Dashboard() {
    return (
    <div>
      <div className="flex justify-end px-4">
        <AddFamily />
      </div>
      <div className="grid grid-cols-4 px-4 gap-4">
        <FamilyCard/>
      </div>
    </div>
  );
}
