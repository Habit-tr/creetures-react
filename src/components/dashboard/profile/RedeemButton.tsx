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
        bgColor="green.200"
        width="100px"
        marginRight="10px"
        marginLeft="10px"
        onClick={handleRedeem}
      >
        Redeem
      </Button>
    </>
  )
};

export default RedeemButton;