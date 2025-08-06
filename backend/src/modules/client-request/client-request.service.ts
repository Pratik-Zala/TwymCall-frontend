import { promises as fs } from 'fs';
import * as path from 'path';
import { geminiService } from '../gemini/gemini.service';
import { microsoftService } from '../microsoft-graph/microsoft.service';

class ClientRequestService {
    async processLatestEmail(accessToken: string): Promise<any> {
        // const email = await microsoftService.getLatestEmail(accessToken);

        // console.log("EMAIL ",email);

        // if (!email) {
        //     throw new Error("No email found.");
        // }

        // const conversationThread = await microsoftService.getConversationThread(accessToken, email.conversationId);
        // const emailCount = conversationThread.length;
        // const lastCommunicator = conversationThread[0].sender.emailAddress.address;

        const email = {
            '@odata.etag': 'W/"CQAAABYAAABySm3Pk6X4R4KX2SsfxcA1AACDMu/g"',
            id: 'AAMkADYwOWZmMjhiLTIxZTUtNGE5OS05OTdmLWFlZmU2NmNjNDEwOABGAAAAAACWfbyxyMLgSLxXchFuaCGPBwBySm3Pk6X4R4KX2SsfxcA1AAAAAAEMAABySm3Pk6X4R4KX2SsfxcA1AACDdxJWAAA=',
            createdDateTime: '2025-06-17T09:39:00Z',
            lastModifiedDateTime: '2025-06-17T09:39:02Z',
            changeKey: 'CQAAABYAAABySm3Pk6X4R4KX2SsfxcA1AACDMu/g',
            categories: [],
            receivedDateTime: '2025-06-17T09:39:01Z',
            sentDateTime: '2025-06-17T09:38:38Z',
            hasAttachments: false,
            internetMessageId: '<CACr9PRNRNvxjGhLqf+EFNRU-CDLU0iEBcHvfP_bn3eLCNqDSPA@mail.gmail.com>',
            subject: 'Re: Request for Drafting and Review of NDA for Potential Investor by June 24, 2025',
            bodyPreview: 'hi\r\n' +
              '\r\n' +
              'On Mon, 16 Jun 2025 at 23:20, Pratik Zala <pratik.zala@ninjatechnolabs.com> wrote:\r\n' +
              '\r\n' +
              'Dear Silver Oak Legal Team,\r\n' +
              '\r\n' +
              'I hope this message finds you well. I am reaching out to request assistance with drafting and reviewing a Non-Disclosure Agreement (',
            importance: 'normal',
            parentFolderId: 'AAMkADYwOWZmMjhiLTIxZTUtNGE5OS05OTdmLWFlZmU2NmNjNDEwOAAuAAAAAACWfbyxyMLgSLxXchFuaCGPAQBySm3Pk6X4R4KX2SsfxcA1AAAAAAEMAAA=',
            conversationId: 'AAQkADYwOWZmMjhiLTIxZTUtNGE5OS05OTdmLWFlZmU2NmNjNDEwOAAQAJxSf6NqxgZChoLuKyvfyG0=',
            conversationIndex: 'AQHb3rwNnFJ/o2rGBkKGgu4rK9/IbbQF+HnSgAAYTQCAAQj2AA==',
            isDeliveryReceiptRequested: null,
            isReadReceiptRequested: false,
            isRead: false,
            isDraft: false,
            webLink: 'https://outlook.office365.com/owa/?ItemID=AAMkADYwOWZmMjhiLTIxZTUtNGE5OS05OTdmLWFlZmU2NmNjNDEwOABGAAAAAACWfbyxyMLgSLxXchFuaCGPBwBySm3Pk6X4R4KX2SsfxcA1AAAAAAEMAABySm3Pk6X4R4KX2SsfxcA1AACDdxJWAAA%3D&exvsurl=1&viewmodel=ReadMessageItem',
            inferenceClassification: 'focused',
            internetMessageHeaders: [
              {
                name: 'Received',
                value: 'from ZRAP278MB0191.CHEP278.PROD.OUTLOOK.COM (2603:10a6:910:2f::14) by ZRAP278MB0064.CHEP278.PROD.OUTLOOK.COM with HTTPS; Tue, 17 Jun 2025 09:38:56 +0000'
              },
              {
                name: 'Received',
                value: 'from ZR0P278CA0088.CHEP278.PROD.OUTLOOK.COM (2603:10a6:910:22::21) by ZRAP278MB0191.CHEP278.PROD.OUTLOOK.COM (2603:10a6:910:2f::14) with Microsoft SMTP Server (version=TLS1_2, cipher=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384) id 15.20.8835.29; Tue, 17 Jun 2025 09:38:52 +0000'
              },
              {
                name: 'Received',
                value: 'from ZR1PEPF0000077C.CHEP278.PROD.OUTLOOK.COM (2603:10a6:910:22:cafe::35) by ZR0P278CA0088.outlook.office365.com (2603:10a6:910:22::21) with Microsoft SMTP Server (version=TLS1_3, cipher=TLS_AES_256_GCM_SHA384) id 15.20.8835.23 via Frontend Transport; Tue, 17 Jun 2025 09:38:52 +0000'
              },
              {
                name: 'Received',
                value: 'from mail-oa1-x29.google.com (2001:4860:4864:20::29) by ZR1PEPF0000077C.mail.protection.outlook.com (2603:10a6:918::106) with Microsoft SMTP Server (version=TLS1_3, cipher=TLS_AES_256_GCM_SHA384) id 15.20.8835.15 via Frontend Transport; Tue, 17 Jun 2025 09:38:51 +0000'
              },
              {
                name: 'Received',
                value: 'by mail-oa1-x29.google.com with SMTP id 586e51a60fabf-2e3e58edab5so1947573fac.3        for <pratik.zala@thetwym.com>; Tue, 17 Jun 2025 02:38:51 -0700 (PDT)'
              },
              {
                name: 'Authentication-Results',
                value: 'spf=permerror (sender IP is 2001:4860:4864:20::29) smtp.mailfrom=ninjatechnolabs.com; dkim=pass (signature was verified) header.d=ninjatechnolabs-com.20230601.gappssmtp.com;dmarc=none action=none header.from=ninjatechnolabs.com;compauth=pass reason=106'
              },
              {
                name: 'Received-SPF',
                value: 'PermError (protection.outlook.com: domain of ninjatechnolabs.com used an invalid SPF mechanism)'
              },
              {
                name: 'DKIM-Signature',
                value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=ninjatechnolabs-com.20230601.gappssmtp.com; s=20230601; t=1750153130; x=1750757930; darn=thetwym.com;        h=to:subject:message-id:date:from:in-reply-to:references:mime-version         :from:to:cc:subject:date:message-id:reply-to;        bh=Gtyc0BqBRPWIJTiN4Y4+CELTmDn0yk91BjBKTOOkDj8=;        b=nlYUoVbzECPDB0qBrKqDvJp/UvyMMDkeXe3NV35UyEkiJkW8tMwjWjgX4Q+Br69JJR         YAMkOLpLTIf7T8DFu7Lnkb2I9xqbEsW2u/y0RdhUSD3WzD1jLu7UpeDqw19AqFGw9u4B         sYKYYAraWItwTkdNIJh0m9cyXKq53WfO1av1xfYxrPBNanYksmZ9hJxxuImMiK+/eXO1         I0GNviqOjkdausye3i/AkXnd0hhvdOHrwyZNNFc/ZehbGw9RcjQ2cFklbAyez81LGwQk         uMnPKq6XRH+WCjaD49e0bZHLuERIiq7ADs/MWQqv38m3nsyfPcseFcOG4Tqad16t53eW         4Few=='
              },
              {
                name: 'X-Google-DKIM-Signature',
                value: 'v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20230601; t=1750153130; x=1750757930;        h=to:subject:message-id:date:from:in-reply-to:references:mime-version         :x-gm-message-state:from:to:cc:subject:date:message-id:reply-to;        bh=Gtyc0BqBRPWIJTiN4Y4+CELTmDn0yk91BjBKTOOkDj8=;        b=GE2XMBn8vVgtA1eSD0U7IoBTTBI80xxkw0e62RXZUaLb0R/Bn7BZAKxE5wCRiiPpQ/         4nzehyNd0y20JhYu3UpP93jn0195OnPD9aeEpzjwzG2qvu+Ehu/ZR87gFwJLrPrWHSPg         ZLeV5oDs27chNvchQyz/pOojLUgPjFFrFBBYcQacNAv7JEnGQqH/KJc1sqzDlEZ8FH6N         ES7BHSFpK8nhjEkWExlrObBD9NLJ21cyVCArSd+6ZeYI4VLRjDyZfDDgD9+AFErJB0LC         JNl1O/iBr8fl3qqfe658Y+zqQq8mnpLB33bpydr2BJUViG5tXi2M5cae5crPvyxDgFwn         1cSQ=='
              },
              {
                name: 'X-Gm-Message-State',
                value: 'AOJu0YyipRCKfZILrdx8M++i7q4N6zWEBJa0Xq/H5bYI8/KMxtsoiGlh\tah0PWLxaHPiRpsE9talqV6NjTHj7G2DUmRqFL/3sSCn2kzv5FXuYnLWWaFqx3H85AEHnUQJYHKB\tKaE1FbHA+ZurK9wfyqa6V9ASGQtc1/gel2/8jR+vOHzQgPIS/ACbRXgGDT8hDRZeffMQCUcNJK6\tEnBX1R6+q5LJjGou7rFY69WUT4N9TBGi/ka0IPHWXWFkikk5n+lRHqe9OgRbFKV0Bvfplh87hmy\tW0JwQJNPyQQQizSPgwiucwkCSP/Og=='
              },
              {
                name: 'X-Gm-Gg',
                value: 'ASbGncv7A4L4XikRf6sAl4Zx+2qvQF+NqwZyxN2sQABEsBsUUxdzisaj2FcnVhOFkmw\tZ2rqecFdS7sFsHoLisrI3iNMPd/503clJcdYuAF1iXccHIXqIvbebBxmE4LH8WYDc54XVwAZVlB\t6BEMN7lMSWzhfjAtO9UTLdYHIYZw3XYBb8opr/p0fLLff1lpRIyzybxk5p0bFBwP9KYadn0f857\t4XdAQ=='
              },
              {
                name: 'X-Google-Smtp-Source',
                value: 'AGHT+IF1t94DuQTIqsNJJb0C6SpvxZAz6IPhft1OfSHjFgX1BHmRxSt9nHhd9uqe+3kNsOrhLPGB5o0qBUy8Ka91w8Y='
              },
              {
                name: 'X-Received',
                value: 'by 2002:a05:6870:ce48:b0:2e9:b6:2edd with SMTP id 586e51a60fabf-2eaf0b86f0dmr6739592fac.32.1750153129651; Tue, 17 Jun 2025 02:38:49 -0700 (PDT)'
              },
              { name: 'MIME-Version', value: '1.0' },
              {
                name: 'References',
                value: '<CACr9PRNzgcH73aEF3cJdbxqP_UgKQODdRD7hrQVmrmXweytH5g@mail.gmail.com> <ZRAP278MB006469B9F25AC55A4BBDC2D8F670A@ZRAP278MB0064.CHEP278.PROD.OUTLOOK.COM> <CACr9PRPz0Vt-EU-Di1hqhv5ApdfvrH-GRR+ue+HPRYeaQTdiFQ@mail.gmail.com>'
              },
              {
                name: 'In-Reply-To',
                value: '<CACr9PRPz0Vt-EU-Di1hqhv5ApdfvrH-GRR+ue+HPRYeaQTdiFQ@mail.gmail.com>'
              },
              {
                name: 'From',
                value: '"Pratik Zala" <pratik.zala@ninjatechnolabs.com>'
              },
              { name: 'Date', value: 'Tue, 17 Jun 2025 15:08:38 +0530' },
              {
                name: 'X-Gm-Features',
                value: 'AX0GCFvWT5Uti-QmOcV7cBIDxrcWBXEq4dqZ0tbxGxdDRgpC1v3txUK_KMCGcnY'
              },
              {
                name: 'Message-ID',
                value: '<CACr9PRNRNvxjGhLqf+EFNRU-CDLU0iEBcHvfP_bn3eLCNqDSPA@mail.gmail.com>'
              },
              {
                name: 'Subject',
                value: 'Re: Request for Drafting and Review of NDA for Potential Investor by June 24, 2025'
              },
              { name: 'To', value: '"pratik zala" <pratik.zala@thetwym.com>' },
              { name: 'Content-Type', value: 'multipart/alternative' },
              { name: 'Return-Path', value: 'pratik.zala@ninjatechnolabs.com' },
              {
                name: 'X-MS-Exchange-Organization-ExpirationStartTime',
                value: '17 Jun 2025 09:38:52.0945 (UTC)'
              },
              {
                name: 'X-MS-Exchange-Organization-ExpirationStartTimeReason',
                value: 'OriginalSubmit'
              },
              {
                name: 'X-MS-Exchange-Organization-ExpirationInterval',
                value: '1:00:00:00.0000000'
              },
              {
                name: 'X-MS-Exchange-Organization-ExpirationIntervalReason',
                value: 'OriginalSubmit'
              },
              {
                name: 'X-MS-Exchange-Organization-Network-Message-Id',
                value: 'd5a629ab-705a-42e4-8cd9-08ddad82c51e'
              },
              { name: 'X-EOPAttributedMessage', value: '0' },
              {
                name: 'X-EOPTenantAttributedMessage',
                value: 'f10ee8ae-9e9c-4dac-a9c3-4508b3c7a7e3:0'
              },
              {
                name: 'X-MS-Exchange-Organization-MessageDirectionality',
                value: 'Incoming'
              },
              { name: 'X-MS-PublicTrafficType', value: 'Email' },
              {
                name: 'X-MS-TrafficTypeDiagnostic',
                value: 'ZR1PEPF0000077C:EE_|ZRAP278MB0191:EE_|ZRAP278MB0064:EE_'
              },
              {
                name: 'X-MS-Exchange-Organization-AuthSource',
                value: 'ZR1PEPF0000077C.CHEP278.PROD.OUTLOOK.COM'
              },
              { name: 'X-MS-Exchange-Organization-AuthAs', value: 'Anonymous' },
              {
                name: 'X-MS-Office365-Filtering-Correlation-Id',
                value: 'd5a629ab-705a-42e4-8cd9-08ddad82c51e'
              },
              { name: 'X-MS-Exchange-AtpMessageProperties', value: 'SA|SL' },
              { name: 'X-MS-Exchange-Organization-SCL', value: '1' },
              {
                name: 'X-Microsoft-Antispam',
                value: 'BCL:0;ARA:13230040|43022699015|8096899003;'
              },
              {
                name: 'X-Forefront-Antispam-Report',
                value: 'CIP:2001:4860:4864:20::29;CTRY:;LANG:en;SCL:1;SRV:;IPV:NLI;SFV:NSPM;H:mail-oa1-x29.google.com;PTR:mail-oa1-x29.google.com;CAT:NONE;SFS:(13230040)(43022699015)(8096899003);DIR:INB;'
              },
              {
                name: 'X-MS-Exchange-CrossTenant-OriginalArrivalTime',
                value: '17 Jun 2025 09:38:51.6138 (UTC)'
              },
              {
                name: 'X-MS-Exchange-CrossTenant-Network-Message-Id',
                value: 'd5a629ab-705a-42e4-8cd9-08ddad82c51e'
              },
              {
                name: 'X-MS-Exchange-CrossTenant-Id',
                value: 'f10ee8ae-9e9c-4dac-a9c3-4508b3c7a7e3'
              },
              {
                name: 'X-MS-Exchange-CrossTenant-AuthSource',
                value: 'ZR1PEPF0000077C.CHEP278.PROD.OUTLOOK.COM'
              },
              { name: 'X-MS-Exchange-CrossTenant-AuthAs', value: 'Anonymous' },
              {
                name: 'X-MS-Exchange-CrossTenant-FromEntityHeader',
                value: 'Internet'
              },
              {
                name: 'X-MS-Exchange-Transport-CrossTenantHeadersStamped',
                value: 'ZRAP278MB0191'
              },
              {
                name: 'X-MS-Exchange-Transport-EndToEndLatency',
                value: '00:00:04.6076249'
              },
              {
                name: 'X-MS-Exchange-Processed-By-BccFoldering',
                value: '15.20.8835.025'
              },
              {
                name: 'X-Microsoft-Antispam-Mailbox-Delivery',
                value: 'ucf:0;jmr:0;auth:0;dest:I;ENG:(910005)(944506478)(944626604)(920097)(930097)(140003);'
              },
              {
                name: 'X-Microsoft-Antispam-Message-Info',
                value: 'X9/5RGAg/KcwwjbevhlHmgRe+2lo6z9yxFmDFFExl6Ryk2EBBVin+Wv8P1H0zDYOgybhq0EHO6oaoeuHEQZDpwpWTgIUPai7CSBJdZZGZDepheEouPzS4T7hVkLIRs6hWbQLy396i93b/HVaJGYzuaVaJwivUI6ZQB/p0pYLZ312EOiQ2lPqLhP6RSQQ1nlSyiCiSISPYW5gavPBDET5EEsqeUvA9IHsG/H1P1zjjp9Afd3ujZs9WmHDgLsAmf2x0/LU3yynKu0BlYpRMg4dtH4mU6vbShfbbRx1p2bMqTqkQjoOR+RsVKB0uqD6Z7tBfYOrrskOQvVONuoE0Z8jmRm/bcyMpICUyHqhEjWEb0sP7BEMcZzKi72SzhABzyTMPb9i4ZZ1mi92ERLd5UOOhNrKGrRUHypVPqgN02dtW27hSfQ4oBGp5cJQR+31LMfrkC5dlmPwC+V+HyMWzkOpjmB4KhMUixb+/dHWRG8m5opgXT+4cQV5VLhK+kOkyioXjGa9wZHbTwC9EeNMNkc8kUW1ymSAkwIx/kfhqVF/KMY83LOXVB/lMzXxShFKshubeTd58AqJUGmzZCII7rMpmcnXlV6PvCodch2mMxfxCYrPtEYG18A44vzGRo1KHJjoKO+N62tlgL9S6zE64YzB7Ex06KsDo3cv6uuwyDPq2qvGFhsSQsS5a+0i3821EMsrHmd/o4kRi/mgPAVAilR4gunL3c6+IlA6e51w/PzOUgpgJh/zpOcPFH0qfsfCZ+DwdiWbLHwRecx/4B6OvLZF0B2Epi72kxFNsxq0wGUA1ENWCCLmcM3zk4rg57sCTmPFGohs4zl+zuClUCTIBX1lokRBBK1fiPUI0ExdsylIlfq6lZLlP/gS9XEPJymMkmrYYPIAKFuT1MfjyY+AQZapbLQOIi8kyqxSkn0yiRaUZErhmi8PJsqqCIKtpmOI/2IYoG+2D3YHcVbnlrfem/CyG9xYP9IK6AlTknpMWloZjpjfg4OAWPHKJpR4F95IJVc9vBHJNeWIljFgTn8Ht8ndbS6V/O+lzhlTwOc/2sRjh92TZ3fJZUDRbCb6SoBf/OI4AchDYj8IR7Bif6ixIi2E+7pH3pwEXU8ataxi45jMeYcXIfdyOyMFgaMndpf0Vp73dLd26LhqBRR6+KI7HHASyes4r4kBPiSaPjgbYkc7SH2n211wnq49cYs6Evh77Izp0yffxsPugZ9VqMLWuY1ZHT2iRkePnFHnRlUB3nBEHJ7IBs3MMW/dRJmuXLhhEGppU9VHaxmFFOvCZK3eWl/XYkzbrVnJ4QV4C15YNjPJ8i1+9VkmLhPMXx5LzUvDYXsTG2+MpT24P0yz2kl1W1u/g2J/OgBz9A2tS6DJ1R1rAG9UoTScQ4gg24NgBLMRGIWT/6zUC1btvOvjLJgx6CWVVXFvbMh6MX8FQ+PpDKyuAAOe7ERcRvrnOXbZ/biImPkEqHWOr6WTzv7sEcmxZZRhFZrNE9Md+XE3NB5ZzAG4rPHL4Ib/mxKAkhB8yc7KkPFkCJIot9BMjDJ4A+EC/dSgRpM/c6mKw8t9uo8C1xHowFkSnQppHdKfVDLBgxURkdhz8b0z+YolH5/R7A8zuFGnHAAYjftda0EzcbYvccO8zUPfy5b/suQFqqH0v3OTLap3155rnfJICoQdOsiorOnY3GOGZ9AaNjg/iULi2a+46IqiS//m5MUgmYv5ViXXPw+s+lK1koFmH69iMP7+D6sDF5ZL4KkdGboS22GWbp0NDZGYUwhwbbz6+LPAyMnxNozH/1pNm9bSQ4IXk9hvbHWrN2PIT4wJimU4eMMG/9WQmXylxO1zJcur5hRdoeBPZRS9PsAsutj/SYpKxVnreBq4V0v5Adzy9lySvLV54bDSA7hHCoD6dhgXlikCvtX5DIT8iPaprn+DaooU0MvBBOFlSfvbPtuFibk0MUi8Z6wXhu1Y6vD28O5it3uKya6AHnge'
              }
            ],
            body: {
              contentType: 'html',
              content: '<html><head>\r\n' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><div dir="ltr">hi</div><br><div class="gmail_quote gmail_quote_container"><div dir="ltr" class="gmail_attr">On Mon, 16 Jun 2025 at 23:20, Pratik Zala &lt;<a href="mailto:pratik.zala@ninjatechnolabs.com">pratik.zala@ninjatechnolabs.com</a>&gt; wrote:<br></div><blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex; border-left:1px solid rgb(204,204,204); padding-left:1ex"><div dir="ltr"><div dir="ltr"><p>Dear Silver Oak Legal Team,</p><p>I hope this message finds you well. I am reaching out to request assistance with drafting and reviewing a Non-Disclosure Agreement (NDA) for an upcoming discussion with a potential investor.</p><p><strong>What I need:</strong></p><ul><li style="margin-left:15px"><p>A professionally drafted NDA template tailored for early-stage fundraising.</p></li><li style="margin-left:15px"><p>A legal review of the finalized version to ensure compliance with U.S. federal and California state laws (our company is incorporated in California).</p></li></ul><p><strong>Deadline:</strong></p><ul><li style="margin-left:15px"><p>We need the initial draft by&nbsp;<strong>Friday, June 21, 2025</strong>.</p></li><li style="margin-left:15px"><p>Final version ready for signature by&nbsp;<strong>Monday, June 24, 2025</strong>, as we plan to share it with the investor that day.</p></li></ul><p><strong>Constraints &amp; Considerations:</strong></p><ul><li style="margin-left:15px"><p>The NDA must include specific clauses around IP protection, non-compete limitations, and a 2-year confidentiality period.</p></li><li style="margin-left:15px"><p>The investor is based in New York, so we would appreciate any considerations regarding bi-jurisdictional enforceability.</p></li><li style="margin-left:15px"><p>We prefer plain English wording suitable for non-legal professionals.</p></li></ul><p>Please confirm if your team can take this on within the specified timeframe. Let me know if you need any additional documentation or background from our side.</p><p>Best regards,<br>Jane Smith<br>COO, ClientCo<br><a href="mailto:jane.smith@clientco.com" target="_blank">jane.smith@clientco.com</a><br>(555) 123-4567</p></div><div class="gmail_quote"><blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex; border-left:1px solid rgb(204,204,204); padding-left:1ex"><div><div dir="ltr"><div><div dir="ltr"></div></div></div></div></blockquote></div></div></blockquote></div></body></html>'
            },
            sender: {
              emailAddress: { name: 'Pratik Zala', address: 'pratik.zala@ninjatechnolabs.com' }
            },
            from: {
              emailAddress: { name: 'Pratik Zala', address: 'pratik.zala@ninjatechnolabs.com' }
            },
            toRecipients: [ { emailAddress: [Object] } ],
            ccRecipients: [],
            bccRecipients: [],
            replyTo: [],
            uniqueBody: {
              contentType: 'html',
              content: '<html><body><div>\r\n' +
                '<div>\r\n' +
                '<div dir="ltr">hi</div></div></div>\r\n' +
                '</body></html>'
            },
            flag: { flagStatus: 'notFlagged' },
            attachments: []
          }
          
        const emailCount = 3;
        const lastCommunicator = "Pratik Zala (June 17, 12:05pm)";

        const promptPath = path.resolve(__dirname, '../gemini/prompt.txt');
        const prompt = await fs.readFile(promptPath, 'utf-8');
        const data = await geminiService.generateLegalMetadata(email, prompt);

    
        return { ...data, emailCount, lastCommunicator, originalEmail: email.body.content };
    }

    private async getPromptTemplate(): Promise<string> {
        // Implementation of getPromptTemplate method
        // This method should return the path to the prompt template file
        // or the content of the prompt template
        throw new Error("Method not implemented");
    }
}

export const clientRequestService = new ClientRequestService(); 