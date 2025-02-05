import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';
import healthimg from '../../assets/health.png';
import foodimg from '../../assets/doughnut.png';
import drinkimg from '../../assets/drink.png';
import armorimg from '../../assets/armor.png';
import { selectLeftInventory } from '../../store/inventory';

const InventoryStats: React.FC = () => {
  const playerStats = useAppSelector((state) => state.inventory.playerStats);

  return (
    <>
      <div className="inventory-control">
      <div className='line'></div>
        <div className="inventory-control-wrapper">
          <div className="stats-container">
            <div
              className="stats-bar"
              style={{ height: `${playerStats.health}%`, backgroundColor: 'var(--low-health)' }}
            ></div>
            <img src={healthimg} alt="" />
            <p>{Math.round(playerStats.health)} %</p>
          </div>
          
          <div className="stats-container">
            <div
              className="stats-bar"
              style={{ height: `${playerStats.hunger}%`, backgroundColor: 'var(--low-hunger)' }}
            ></div>
            <img src={foodimg} alt="" />
            <p>{Math.round(playerStats.hunger)} %</p>
          </div>

          <div className="stats-container">
            <div
              className="stats-bar"
              style={{ height: `${playerStats.thirst}%`, backgroundColor: 'var(--low-thirst)' }}
            ></div>
            <img src={drinkimg} alt="" />
            <p>{Math.round(playerStats.thirst)} %</p>
          </div>

          <div className="stats-container">
            <div
              className="stats-bar"
              style={{ height: `${playerStats.armor}%`, backgroundColor: 'var(--low-armor)' }}
            ></div>
            <img src={armorimg} alt="" />
            <p>{Math.round(playerStats.armor)} %</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryStats;
