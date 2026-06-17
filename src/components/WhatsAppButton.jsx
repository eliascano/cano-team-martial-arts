import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/543564657525"
      target="_blank"
      rel="noreferrer"
      className="
        fixed
        bottom-6
        right-6
        z-50
        bg-green-500
        hover:bg-green-600
        p-4
        rounded-full
        shadow-xl
        text-3xl
      "
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;