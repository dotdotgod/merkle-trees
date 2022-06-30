import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const whitelistAddresses = [
  "0x00000000219ab540356cbb839cbe05303d7705fa",
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf",
  "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
];

const leafNodes = whitelistAddresses.map((address) => keccak256(address));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getRoot();

console.log("Leaves: ", leafNodes, "\n");

console.log("Whitelist Merkle Tree\n", merkleTree.toString());
console.log("Root Hash: ", rootHash, "\n");

const claimingAddress = leafNodes[0];

console.log(
  "\n1\n",
  claimingAddress.toString("hex"),
  "\n2\n",
  Buffer.from(claimingAddress.toString("hex"), "hex").toString("hex"),
  "\n3\n"
);

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(keccak256(claimingAddress), "\n");

console.log(hexProof, "\n");

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash), "\n");

const prev = keccak256(
  Buffer.from(hexProof.at(-2).replace("0x", ""), "hex"),
  claimingAddress
).toString("hex");

console.log(prev, "\n RootHash: ", rootHash.toString("hex"), "\n");
console.log(
  keccak256(Buffer.from(hexProof.at(-1).replace("0x", ""))).toString("hex")
);
