export default class RegexpUtil {
  static UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  static isUUID(str: string) {
    return RegexpUtil.UUID.test(str);
  }
}
