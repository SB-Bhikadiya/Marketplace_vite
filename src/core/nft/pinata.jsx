import { Axios } from "../axios";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNmQ3MjVjOS1mZTRkLTRmNzktOGZkZi1lNjZkNmM3ZmU0MWUiLCJlbWFpbCI6InNhZ2FycGF0ZWwxMTEyc2NpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNTI0NWMyZjM0ZDY4YmYyNWUzNyIsInNjb3BlZEtleVNlY3JldCI6IjFjZDllOWNiN2ZkM2RhOTk2MzQ4ODI3OTdiOTI4MzIyY2VhOGFkOTg0YjM4NTdjNmMyMTA0NmI0ZWYzODkwZGEiLCJpYXQiOjE3MTA1NTQ2MjV9.lM2BLQxsN6ARbDP3GDZ2mEcmxPD4aNE_cNadxb7-EYE";

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return Axios.post(url, JSONBody, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinFileToIPFS = async (formdata) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return Axios.post(url, formdata, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
