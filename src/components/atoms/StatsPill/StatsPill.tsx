type StatsPillProps = {
  title: string;
};

export const StatsPill = ({ title }: StatsPillProps) => (
  <p className="text-xs w-fit shadow-lg font-semibold uppercase text-center text-gray-700 bg-white rounded-xl py-2 px-5 hover:bg-gray-100">
    {title}
  </p>
);
