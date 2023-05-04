type ServiceType = 'identifier' | 'company' | 'employee';

export default class ServiceError extends Error {
  constructor(public service: ServiceType & string, message: string) {
    super(message);
  }
}
