import { useEffect } from "react";

const MERCH_LINK_URL = "https://campusgroups.rit.edu/store?store_id=5077&cglink=1";

const MerchLink = () => {
  useEffect(() => {
    window.location.href = MERCH_LINK_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to merch store...</p>
    </div>
  );
};

export default MerchLink;
