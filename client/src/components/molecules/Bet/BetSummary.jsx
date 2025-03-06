import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";


export const BetSummary = ({ stake, betsCount, totalMultiplier, onStakeChange }) => (
  <div className="p-2 font-bold text-sm">
    <div className="flex justify-between mb-2 text-lg">
    <Input placeholder="Stake" type="number" min={0} className="max-w-[100px]" onChange={onStakeChange} />
    <Badge className="text-base">{betsCount > 0 ? totalMultiplier : "0.00"}</Badge>
    </div>
    <div className="flex items-center justify-between mb-2 text-lg">
      <span>Potential win:</span>
      <span>{(stake * totalMultiplier).toFixed(2)} $</span>
    </div>
  </div>
);