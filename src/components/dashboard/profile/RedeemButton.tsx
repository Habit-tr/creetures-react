import { Button } from "@chakra-ui/react";

interface RedeemButtonProps {
  id: number;
  onRedeem: () => Promise<void> | void;
}

const RedeemButton = ({ id, onRedeem }: RedeemButtonProps) => {

  const handleRedeem = async () => {
    await onRedeem();
  };

  return (
    <>
      <Button
        m="10px"
        bgColor="white"
        border="1px black solid"
        width="100px"
        onClick={handleRedeem}
      >
        Redeem
      </Button>
    </>
  )
};

export default RedeemButton;