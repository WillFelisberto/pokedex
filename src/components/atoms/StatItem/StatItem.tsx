import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface StatItemProps {
  value: string | number;
  type: 'height' | 'weight' | 'category' | 'ability';
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({ value, type, className }) => {
  const labelText = {
    height: 'Altura',
    weight: 'Peso',
    category: 'Categoria',
    ability: 'Habilidade'
  };

  return (
    <div className={clsx('flex flex-col gap-[4.5px] items-left  p-3 rounded-lg  ', className)}>
      <div className="flex items-end gap-[8.5px] text-gray-500 text-xs font-semibold uppercase">
        <Image src={`/icons/svg/outlined/${type}.svg`} alt={type} width={18} height={18} />
        <span>{labelText[type] || type}</span>
      </div>
      <div className="mt-1 font-(--font-poppins)  w-full py-[8px] bg-white rounded-[15px] text-gray-800 font-bold text-lg text-center border border-[#E5E5E5]">
        {value}
      </div>
    </div>
  );
};
