import dayjs from "dayjs";
import useModal from "../../../../../hooks/use-modal";
import { toast } from "../../../../ui/toast";
import { Accordion, AccordionItem } from "../../../../ui/accordion";
import Button from "../../../../ui/button";
import { Modal, ModalBody, ModalHeader } from "../../../../ui/modal";
import useRequest from "../../../../../hooks/use-request";
import { approveHseContinuation } from "../../../../../assets/api/permit";

export default function HseOfficer({ permit }: any) {
  const approveApi = useRequest(approveHseContinuation);
  const isApproved = permit.continuationHseOfficerStatus === "APPROVED";

  const { toggle, modals } = useModal({
    confirmApproval: false,
    confirmRejection: false,
  });

  async function approvePermit() {
    const [_, err] = await approveApi.makeRequest({ id: +permit.id });
    if (err) {
      return toast({
        variant: "error",
        message:
          err.message ?? "Failed to approve continuation, please try again",
      });
    }
    window.location.reload();
  }

  return (
    <div className="app-section">
      {permit.continuationHseOfficerStatus === "IN_PROGRESS" ? (
        <div className="app-ptw__details__module">
          <h4>Approval Section</h4>
          <p>
            To approve this permit, ensure you have properly gone through the
            PTW Details and confirmed all details and documents provided. Kindly
            fill in addition notes below to add more details.
          </p>

          <div className="app-ptw__details__module__btn-footer">
            <Button variant="primary" onClick={() => toggle("confirmApproval")}>
              Approve Permit
            </Button>
          </div>
        </div>
      ) : (
        <Accordion show title="Approval Details">
          <AccordionItem
            title="Status"
            value={
              isApproved ? (
                <p className="active-text">Approved</p>
              ) : (
                <p className="danger-text">Rejected</p>
              )
            }
          />
          <AccordionItem
            title="Date"
            value={dayjs(permit.continuationHseOfficerStatusDate).format(
              "MMM DD, YYYY HH:mm A"
            )}
          />
          <AccordionItem title="Approved by:" value={"MECHANICAL"} />
        </Accordion>
      )}

      <Modal
        show={modals.confirmApproval}
        toggle={() => toggle("confirmApproval")}
        align="center"
      >
        <ModalHeader>HSE Officer</ModalHeader>
        <ModalBody>
          {/* prettier-ignore */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8458 15.8292C37.604 13.801 39.778 12.1748 42.2203 11.0612C44.6625 9.94753 47.3158 9.37246 50 9.37501C55.6542 9.37501 60.7208 11.875 64.1542 15.8292C66.8321 15.638 69.5198 16.0254 72.0347 16.965C74.5496 17.9047 76.8328 19.3746 78.7292 21.275C80.6288 23.1711 82.0982 25.4536 83.0379 27.9677C83.9775 30.4818 84.3653 33.1686 84.175 35.8458C86.2025 37.6044 87.8278 39.7786 88.9407 42.2208C90.0536 44.6631 90.6281 47.3162 90.625 50C90.6276 52.6842 90.0525 55.3375 88.9388 57.7797C87.8252 60.222 86.1991 62.396 84.1708 64.1542C84.3612 66.8314 83.9733 69.5182 83.0337 72.0323C82.0941 74.5464 80.6246 76.8289 78.725 78.725C76.8289 80.6246 74.5464 82.0941 72.0323 83.0337C69.5182 83.9733 66.8314 84.3612 64.1542 84.1708C62.396 86.1991 60.222 87.8252 57.7797 88.9388C55.3375 90.0525 52.6842 90.6276 50 90.625C47.3158 90.6276 44.6625 90.0525 42.2203 88.9388C39.778 87.8252 37.604 86.1991 35.8458 84.1708C33.1682 84.3626 30.4807 83.9759 27.9659 83.0369C25.451 82.098 23.1676 80.6288 21.2708 78.7292C19.3707 76.8326 17.9009 74.5494 16.9613 72.0345C16.0216 69.5197 15.6341 66.8321 15.825 64.1542C13.7976 62.3956 12.1722 60.2214 11.0593 57.7792C9.94636 55.337 9.37194 52.6839 9.37501 50C9.37501 44.3458 11.875 39.2792 15.8292 35.8458C15.6386 33.1686 16.0263 30.4817 16.9659 27.9676C17.9056 25.4535 19.3752 23.1709 21.275 21.275C23.1709 19.3752 25.4535 17.9056 27.9676 16.9659C30.4817 16.0263 33.1686 15.6386 35.8458 15.8292ZM65.0417 42.4417C65.2917 42.1086 65.4726 41.7288 65.5737 41.3248C65.6748 40.9208 65.6942 40.5006 65.6306 40.089C65.5671 39.6774 65.4219 39.2826 65.2036 38.9279C64.9853 38.5732 64.6982 38.2657 64.3594 38.0236C64.0206 37.7814 63.6367 37.6094 63.2305 37.5176C62.8242 37.4259 62.4037 37.4163 61.9937 37.4894C61.5836 37.5625 61.1924 37.7169 60.8428 37.9434C60.4933 38.1699 60.1926 38.464 59.9583 38.8083L46.475 57.6833L39.7083 50.9167C39.1159 50.3647 38.3324 50.0642 37.5228 50.0784C36.7132 50.0927 35.9408 50.4207 35.3683 50.9933C34.7957 51.5658 34.4677 52.3382 34.4534 53.1478C34.4392 53.9574 34.7397 54.7409 35.2917 55.3333L44.6667 64.7083C44.9875 65.0289 45.3742 65.2758 45.8 65.4319C46.2257 65.5879 46.6804 65.6495 47.1324 65.6122C47.5843 65.575 48.0227 65.4398 48.4172 65.216C48.8117 64.9923 49.1527 64.6854 49.4167 64.3167L65.0417 42.4417Z" fill="#008171"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.2763 9.62585C35.3536 7.22944 37.9223 5.30809 40.808 3.99228C43.6936 2.67646 46.8285 1.997 50 2.00001C56.6806 2.00001 62.6671 4.95386 66.7237 9.62585C69.8877 9.39993 73.0633 9.85765 76.0348 10.9679C79.0062 12.0782 81.7039 13.815 83.9446 16.0603C86.189 18.3006 87.9253 20.9975 89.0355 23.968C90.1457 26.9385 90.6039 30.1131 90.3791 33.2763C92.7746 35.3541 94.695 37.923 96.01 40.8086C97.3249 43.6942 98.0036 46.8289 98 50C98.003 53.1715 97.3235 56.3064 96.0077 59.1921C94.6919 62.0777 92.7706 64.6464 90.3741 66.7237C90.599 69.8869 90.1408 73.0615 89.0306 76.032C87.9203 79.0025 86.1841 81.6994 83.9397 83.9397C81.6994 86.1841 79.0025 87.9204 76.032 89.0306C73.0615 90.1408 69.8869 90.599 66.7237 90.3742C64.6463 92.7706 62.0777 94.6919 59.192 96.0077C56.3064 97.3235 53.1715 98.003 50 98C46.8285 98.003 43.6936 97.3235 40.808 96.0077C37.9223 94.6919 35.3536 92.7706 33.2763 90.3742C30.1126 90.6007 26.9373 90.1438 23.9658 89.0344C20.9944 87.925 18.2965 86.1891 16.0554 83.9446C13.8103 81.7038 12.0737 79.006 10.9634 76.0346C9.85321 73.0632 9.39534 69.8877 9.62094 66.7237C7.22542 64.6459 5.305 62.077 3.99004 59.1914C2.67509 56.3058 1.99639 53.1711 2.00001 50C2.00001 43.3194 4.95386 37.3329 9.62586 33.2763C9.40066 30.1131 9.85873 26.9384 10.969 23.9679C12.0792 20.9973 13.8156 18.3004 16.0603 16.0603C18.3004 13.8156 20.9973 12.0792 23.9679 10.969C26.9384 9.85873 30.1131 9.40066 33.2763 9.62585ZM67.7723 41.0695C68.0677 40.6759 68.2814 40.2273 68.4009 39.7499C68.5204 39.2725 68.5433 38.7761 68.4682 38.2897C68.3931 37.8034 68.2215 37.337 67.9636 36.9179C67.7056 36.4988 67.3665 36.1355 66.9662 35.8494C66.5658 35.5632 66.1123 35.36 65.6323 35.2516C65.1523 35.1432 64.6554 35.1319 64.171 35.2183C63.6865 35.3047 63.2242 35.487 62.8112 35.7546C62.3982 36.0223 62.0429 36.3697 61.7661 36.7766L45.8351 59.0782L37.84 51.0831C37.1401 50.4309 36.2143 50.0758 35.2577 50.0927C34.3012 50.1096 33.3885 50.4971 32.712 51.1736C32.0355 51.8501 31.648 52.7627 31.6311 53.7193C31.6143 54.6758 31.9693 55.6016 32.6215 56.3015L43.6985 67.3785C44.0775 67.7572 44.5344 68.0489 45.0375 68.2333C45.5406 68.4178 46.0777 68.4905 46.6118 68.4464C47.1458 68.4024 47.6638 68.2427 48.1299 67.9783C48.5959 67.714 48.9989 67.3514 49.3108 66.9157L67.7723 41.0695Z" fill="#008171" fill-opacity="0.1"/>
          </svg>

          <h4 className="app-modal__content__title">Approve Permit</h4>
          <p className="app-modal__content__desc">
            By approving this permit, it means you have verified all the details
            and document provided they match the required standards.
          </p>

          <div className="app-modal__content__footer">
            <Button
              variant="secondary"
              onClick={() => toggle("confirmApproval")}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={approvePermit}
              isLoading={approveApi.isLoading}
            >
              Approve
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
