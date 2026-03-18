function createAllDocuments() {
  var proposalUrl = createProposal();
  var checklistUrl = createChecklist();
  var agreementUrl = createAgreement();

  Logger.log('=== ALL DOCUMENTS CREATED ===');
  Logger.log('Proposal:  ' + proposalUrl);
  Logger.log('Checklist: ' + checklistUrl);
  Logger.log('Agreement: ' + agreementUrl);

  return {
    proposal: proposalUrl,
    checklist: checklistUrl,
    agreement: agreementUrl
  };
}
