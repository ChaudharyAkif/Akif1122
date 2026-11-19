
import React from "react";
import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const LeftSide = () => {
  return (
    <div className="hidden flex-col justify-between bg-black p-12 text-white md:flex">
      <div>
        <Title level={1} className="!text-3xl !font-bold !text-white">
          AHT<span className="text-gray-400">Coders.</span>
        </Title>

        <Paragraph className="!mt-3 !text-gray-400">
          Your favorite products, all in one place.
        </Paragraph>
      </div>

      <div>
        <Title level={2} className="!text-4xl !font-bold !leading-tight !text-white">
          Start your Coding journey with us.
        </Title>

        <Paragraph className="!mt-5 !text-gray-400">
          Create an account and discover amazing products at great prices.
        </Paragraph>
      </div>

      <Text className="!text-sm !text-gray-500">
        © 2026 AHT Coders. All rights reserved.
      </Text>
    </div>
  );
};

export default LeftSide;
