export default function GoogleMap({
  embedUrl,
  address,
}: {
  embedUrl: string;
  address: string;
}) {
  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: "var(--site-radius, 12px)" }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${address}`}
      />
    </div>
  );
}
