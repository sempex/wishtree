import { DrawEmailProps } from "@/utils/schema";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export const DrawEmail = ({ username, giver, wishes }: DrawEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://utfs.io/f/9pPKOxrEqIP0U6zzefOPtdmX4NMKkGI2VpAE0sjW5hw9JuSc`}
                width="100"
                height="100"
                alt="WishTree"
                className="my-0 mx-auto rounded-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              You drew <strong>{giver}</strong> for secret santa!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You drew <strong>{giver}</strong> for secret santa! Here are some
              gift ideas they shared:
            </Text>
            <Section>
              <ul className="">
                {wishes.map((wish) => {
                  return (
                    <li key={wish}>
                      <a className="text-lg">{wish}</a>
                    </li>
                  );
                })}
              </ul>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DrawEmail;
