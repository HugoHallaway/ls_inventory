import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import HotInventoryGrid from './HotInventoryGrid';
import box from '../../assets/box.png'
import person from '../../assets/person.png'
import newdrop from '../../assets/newdrop.png'
import drop from '../../assets/drop.png'
import otherplayer from '../../assets/otherplayer.png'
import inspect from '../../assets/inspect.png'
import crafting from '../../assets/crafting.png'
import weights from '../../assets/weight.png'
const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);
  const images: Record<string, string> = {
    player: person,
    newdrop: newdrop,
    drop: drop,
    otherplayer: otherplayer,
    inspect: inspect,
    crafting: crafting,
  };

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div>
          <div className="inventory-grid-header-wrapper">
            <div className='label-container'>
              <img src={images[inventory.type] || box} alt="" />
            <p>{inventory.label}</p>
            </div>
            {inventory.maxWeight && (
              <div className='weight-container'>
                <img src={weights} alt="" />
              <p>
                {(weight / 1000).toFixed(2)} / {inventory.maxWeight / 1000} kg
              </p>
              </div>
            )}
          </div>
        </div>

        {inventory.type === 'player' && (
          <div className='player'>
            <HotInventoryGrid inventory={inventory} />
          </div>
        )}

        <div className={inventory.type == 'player' ? "inventory-grid-container" : "secinventory-grid-container"} ref={containerRef}>
          <>
            {inventory.items.slice(inventory.type == 'player' ? 5 :0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
