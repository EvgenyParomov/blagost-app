import { v4 } from 'uuid';

export const uuid = v4;

let index = 0;
export const getStabId = () => {
  return ids[index++] ?? v4();
};

export const ids = [
  'd290643f-e566-4f24-aab1-7bf8be4bed0a',
  '23563127-2f5b-457d-a2f5-a0c3cf009d43',
  '20b83a23-aaf6-4947-922e-279c3910659a',
  'a10b8d94-6aac-4de0-a198-fadf0290e13b',
  '65dd6a2c-e329-4617-b997-959a92c2d83a',
  'a049633d-be91-40fd-9048-6d7e995f31a0',
  '823b18df-0e99-4e81-867c-b5ed59230999',
  '59539e01-1e8a-4a59-9482-33ab1ed97702',
  'c6308662-9e57-44b7-ab3b-083f199c1573',
  '6efed953-6487-427c-8f1d-ca494204cffd',
  'd55b8c1e-d97e-4c3e-ac22-cfe266433692',
  'a18afd9f-dd67-4fd4-b054-ba9ab293ea2c',
  'bc9d8233-a3da-46f3-a8cc-56b94dbb1275',
  'c216c659-108a-4694-98a9-9aad55496ae2',
  '807019e1-44bd-4d2e-bbf1-fe97518b1c05',
  'd24a7387-cf53-4817-b71e-0019a0d27bc8',
  '37bcfd2b-fb6f-4805-8c97-6890cb87d387',
  '5fe9efc3-d044-4181-82f2-8aac642a315f',
  '2cd517ad-3767-483d-8c9e-b60f2fa0d81d',
  'f2026f57-deac-4b79-97ec-5ab79741217d',
  'bc706c40-0a58-421b-a04c-569ae2964a44',
  '336cf4a7-bb0d-4472-a905-1338e07fcf2d',
  'd1e791f9-15ab-476c-a0d7-3a80d5b0533e',
  '4bf3258a-020f-47f1-88ae-377df48cda5d',
  '8464e897-a0ae-4ed6-a952-7c7fe3dc1372',
  'e31c6732-e57c-42b0-85fb-57fa2ef28b8b',
  '938c70d4-4fbe-4794-81a2-d91e6672db0c',
  'a725c921-a45f-494b-9ecc-bee793e119d0',
  '61cf15ac-0f7b-45ec-8044-e0eee6b90a39',
  '5e690ad5-ecac-47c0-99f4-dfb5b73e6bc4',
  '364c83df-9b43-41c8-b10b-de3696ddd0a5',
  '99761323-2bd7-4fc0-924a-8cd189c3bc3b',
  '1f05e6c8-88df-45c3-84ca-b76c9eaf1669',
  '2779a76d-2ca1-40c1-975a-fcede8a110ef',
  'ea65fa63-da21-46c3-88dc-c41983ef4d88',
  '89383293-2dad-470c-9c82-b534a6f7cb54',
  'b18604ed-cd75-421b-9426-2f016dfe2ab5',
  'dfd19868-5bce-4657-a665-d540542bb988',
  '1d82e524-cf82-4a5b-ba70-33473fc4ae9a',
  'c15de374-f8b0-4e38-9ac7-e1fca22e1ff3',
  '9ff4b306-bb97-4b32-aa06-b86db50d1ea3',
  '45d48e28-462d-4561-9964-2a39325fe9d3',
  '3715d9d5-17be-4a4f-a630-55b90e239445',
  '2cee276a-e558-4051-aaea-bef8f500b246',
  'd4e72dd5-914c-46ea-b788-91721c1ea4ae',
  '56812872-d83f-4826-9137-862dcfe3b99a',
  '48739841-35a9-4f30-9f1a-7394793d2319',
  'bf3f21a9-53d1-45d4-9ab0-6694965319b2',
  '6447dc79-b48f-49ac-8faf-55d85b997433',
  '0022fe27-edc8-44af-9c7e-896dd7815ea4',
  'b0a5780e-567f-45bb-838e-09e809aebe64',
  '02e33562-7f71-4282-a69d-ee377eeb95ac',
  '12a3e12a-954a-4e4a-b34b-93b0a1376b8b',
  'd125dbcf-d7e8-475d-9e66-1f21aec2ca9f',
  '2c59229b-1d58-4ce2-b405-a65d3e3e7c3f',
  '4adf5b58-1018-4821-858e-73e4f26b0af7',
  '5d97e2f9-d1d9-4789-b52e-e3aa549e7079',
  '04d53cb3-2190-4b55-b36b-418a23150eeb',
  'b5cce477-67e9-4108-9e4e-83f58cf35010',
  '8bc58ed2-a98b-41d7-a707-754f132ce443',
  '071e4990-5f01-45fc-9a59-377058b00107',
  '8faa9b1e-69f4-412d-9625-2cb67a963e4d',
  '0489bcd7-8776-43e5-ad08-d3f5f2bf387b',
  'a335b217-0e9d-4ed8-a132-7ccead9304f1',
  '96268f24-d414-446f-953a-83153c260931',
  '9e058971-a349-42d9-a01c-00a3fbf93db4',
  '91f79d3f-7394-4a92-ba24-0cdd398619d4',
  'c56f74bd-e27d-4ca3-bc35-11a4e9af4a33',
  'dc8aa8f3-f091-4f28-aae7-2de549124492',
  '8909e730-198d-4398-97f5-5e63a1df236e',
  '7525899c-ac3f-4915-85f2-bed045f50ce1',
  '3f52adbf-6b8e-40f8-97f3-5150ab2ae234',
  '65d90ffe-31ac-49cb-b68c-594bd5d49ab7',
  'f5f62126-04b7-4aae-a0c3-d80168fc130c',
  '45aa1944-95dc-4b47-99c0-406875a0a14a',
  'ef59a31e-c57c-477a-b6bd-bf8ad2a0d09b',
  'b4cf31a2-652a-4d41-aa1e-5a247da1fa86',
  'c459801b-9cdf-4b0a-8bc6-a0e6be545af8',
  '88585c00-2b41-4cbe-9ac1-e55cfb552f8a',
  '84b36d2d-eaba-4dae-95bc-17fc2dc28b69',
  '35bb56c3-34f0-46c7-b07b-a734b0f14e33',
  '284a8c52-050c-40ce-b95f-044b32d8e90f',
  '6ea07603-e04c-4a61-a85e-827cdede6172',
  'e1425908-b171-487c-873b-b9fc5bcff714',
  '52d9b504-ff6f-4bd1-8e37-2b8f167e06ad',
  'f0e8f935-db95-4e3b-b1a0-bf523cd45154',
  'b7529c0c-49a8-4b3f-b743-6965ad71425a',
  'fcf29e49-a4a8-437e-99cd-ab6643a87aa2',
  '8dc8a524-dbaa-4e4e-9855-b5eeac75079b',
  '8bebcf34-ecc6-4cf4-8daf-eb2ca37b032c',
  'b5ddc1d2-f90e-485a-a76d-b7cd881bc415',
  '90e87151-760a-4805-ab18-c81aa2a03eaf',
  '65ede08d-9d0d-45e1-8dc4-cd515695ed83',
  'dd95f103-2845-426d-a96c-bcaf39028612',
  '4e52d054-5b6a-4fb7-b882-374fa1825144',
  'a232bc5e-fb73-4a18-b7ea-8216d1f68c16',
  '0d918e57-f2c4-4050-bea8-a1b7887b069f',
  '200389ae-14d0-4018-8880-f556778ca8bd',
  '45153697-b61f-44ce-98d3-541a83dd05c0',
  '73800375-9b76-418c-95ef-9f6edbfd61d3',
];
