import { Trash2 } from "lucide-react";

export function CartItem({ item, onRemove }: { item: any; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  );
}
