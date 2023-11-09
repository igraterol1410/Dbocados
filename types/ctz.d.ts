export interface CtzInfoProp {
    ctzCakePrice: string,
    ctzCakeName: string | null,
    ctzFillingPrice: string,
    ctzFillingName: string | null,
    ctzCoveragePrice: string,
    ctzCoverageName: string | null,
    ctzExtraPrice: string,
    ctzWhPrice: string,
    ctzIndirectExpenses: string,
    ctzEarn: string,
    ctzTotalPrice: string,
    ctzRoundedAmount: string
  }

  export interface CtzGlobalProp {
    id: string | number,
    ctzWorkHand: ctzWorkHand, 
    ctzCake: ctzCake, 
    ctzCoverage: ctzCoverage, 
    ctzFilling: ctzFilling, 
    ctzExtra: ctzExtra, 
    ctzPeople: ctzPeople, 
    ctzEarn: ctzEarn
  }