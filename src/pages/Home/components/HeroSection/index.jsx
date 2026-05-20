import { HeroSection as StyledHero, HeroTitle, HeroSubtitle } from './styles';

export const HeroSection = () => {
  return (
    <StyledHero>
      <HeroTitle level={1}>Transforme Tecnologia em Oportunidade</HeroTitle>
      <HeroSubtitle>
        Doe dispositivos eletrônicos que você não usa mais, ou encontre o
        equipamento que você precisa.
      </HeroSubtitle>
    </StyledHero>
  );
};
