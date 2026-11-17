import CodeNameSetup from "./CodeNameSetup";

// RP1-183: the associations that manage auction centers and that brokers belong to.
const CONFIG = {
  path: "/associations",
  noun: "Association",
  plural: "associations",
  codeLabel: "Association Code",
  nameLabel: "Association Name",
  totalLabel: "Total Associations",
  codeKey: "associationCode",
  nameKey: "associationName",
  totalKey: "totalAssociations",
  usage: [
    { key: "totalAuctionCenters", label: "Auction Centers" },
    { key: "totalBrokers", label: "Brokers" },
  ],
  codeExample: "TTAB",
  nameExample: "Tea Traders Association of Bangladesh (TTAB)",
};

const Association = () => <CodeNameSetup config={CONFIG} />;

export default Association;
