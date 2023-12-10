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
    workHand: ctzWorkHand, 
    cake: ctzCake, 
    coverage: ctzCoverage, 
    filling: ctzFilling, 
    extra: ctzExtra, 
    people: ctzPeople, 
    earn: ctzEarn,
    name: ctzName,
    status: string,
    created_at: string,
    updated_at: string
  }