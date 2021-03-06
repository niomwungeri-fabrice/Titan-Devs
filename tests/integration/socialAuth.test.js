import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { mockRequest, mockResponse } from "mock-req-res";
import socialAuthController from "../../controllers/auth/socials/socialAuthController";
import {
  userFound,
  dummyProfileTwitter,
  dummyProfileGoogle
} from "../helpers/socialAuthHelpers";
import constants from "../../helpers/constants";

const { INTERNAL_SERVER_ERROR } = constants.statusCode;
const { SERVER_ERROR } = constants.errorMessage;
const { expect } = chai;
chai.use(sinonChai);
describe("mocking social authentication with twitter", () => {
  const res = mockResponse();
  const req = mockRequest({ user: dummyProfileTwitter });
  it("should redirect a user to profile page with data", async () => {
    const stubFindOne = sinon
      .stub(socialAuthController, "createUserFromSocial")
      .returns(userFound);
    await socialAuthController.socialLogin(req, res);
    expect(res.redirect).to.have.been.calledWith(
      sinon.match(`/api/v1/profiles/${userFound.username}`)
    );
    sinon.assert.calledOnce(stubFindOne);
    stubFindOne.restore();
    res.redirect.resetHistory();
  });

  it("should return an error when authentication with social failed", async () => {
    const stubFindOne = sinon
      .stub(socialAuthController, "createUserFromSocial")
      .returns(false);
    await socialAuthController.socialLogin(req, res);
    expect(res.json).to.have.been.calledWith(sinon.match({ message: SERVER_ERROR }));
    expect(res.status).to.have.been.calledWith(sinon.match(INTERNAL_SERVER_ERROR));
    res.status.resetHistory();
    res.json.resetHistory();
    stubFindOne.restore();
  });

  it("check if a user can be created form social authentication data", async () => {
    const user = await socialAuthController.createUserFromSocial(dummyProfileGoogle);
    expect(user).to.not.be.equals(false);
    expect(user.email).to.be.eqls(dummyProfileGoogle.emails[0].value);
    expect(user.username).to.have.string(dummyProfileGoogle.username);
    expect(user.socialId).to.be.eqls(dummyProfileGoogle.id);
  });
});
