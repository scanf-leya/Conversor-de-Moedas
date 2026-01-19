export function Flag({ code }: { code: string }) {
  const lowerCode = code.toLowerCase();
  const countryCode = lowerCode.slice(0, 2);
  console.log("Country code:", countryCode);
  return (
    <div className="w-5 h-5 rounded-full self-center">
      <img
        src={`https://countryflagsapi.netlify.app/flag/${countryCode}.svg`}
        alt={`Flag of ${countryCode}`}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
}
