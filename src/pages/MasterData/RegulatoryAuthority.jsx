import CodeNameSetup from "./CodeNameSetup";

// RP1-186: the regulatory authorities that auction centers answer to.
const CONFIG = {
  path: "/regulatory-authorities",
  noun: "Regulatory Authority",
  plural: "regulatory authorities",
  codeLabel: "Authority Code",
  nameLabel: "Authority Name",
  totalLabel: "Total Authorities",
  codeKey: "authorityCode",
  nameKey: "authorityName",
  totalKey: "totalAuthorities",
  usage: [{ key: "totalAuctionCenters", label: "Auction Centers" }],
  codeExample: "BTB",
  nameExample: "Bangladesh Tea Board",
};

const RegulatoryAuthority = () => <CodeNameSetup config={CONFIG} />;

export default RegulatoryAuthority;
