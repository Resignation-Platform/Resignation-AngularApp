/********************

create table [Employee]
(
            id int identity(1,1) PRIMARY KEY,
            txtEmpno varchar(8),
            txtEmpEmailId varchar(255),
            txtEmpAddress varchar(255),
            txtEmpContact char(13),
            dateOfJoining date,
            flgisConfirmed char(1),
            txtstatus varchar(20)
 )


 create table EmpDepartment
 (
            id int identity(1,1) primary key,
            txtDepartment varchar(20)
  )

 create table EmpRoles
(
            id int identity(1,1) PRIMARY KEY,
            txtRole varchar(8),
            deptid int  FOREIGN KEY REFERENCES EmpDepartment(id)
 )

 create table EmployeeDetails
 (
            empno int PRIMARY KEY,
            introle int,
            txtJoblevel varchar(5),
            txtprojectManagerEmpNo varchar(8),
            txtDeliveryHeadEmpNo varchar(8),
            txtHREmpNo varchar(8),
            intDepartment int FOREIGN KEY REFERENCES EmpDepartment(id)
  )


		insert into [Employee]
		select '1024','veer','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1025','veerqq','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1026','sarath','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1027','sudhanshu','asss','7032730227',getdate(),'1','okkk'


		update [Employee] set txtEmpEmailId='veeranjaneyulu' where txtEmpno='1025'


		insert into EmpRoles
		select 'emp',1
		insert into EmpRoles
		select 'HR',1
		insert into EmpRoles
		select 'PM',1
		insert into EmpRoles
		select 'DH',1


		insert into EmpDepartment
		select 'Engineering'


		insert into EmployeeDetails
		select '1024','1','6L','1026','1027','1025',1

		insert into EmployeeDetails ---hR
		select '1025',2,'5L','','','',1

		insert into EmployeeDetails ---PM
		select '1026',3,'5B','','','',1

		insert into EmployeeDetails ---PM
		select '1027',4,'5B','','','',1





	  create table ExitQuestions
	  (
            intId int identity(1,1) PRIMARY KEY,
            txtQuestion varchar(255),
            txtOptions varchar(255)

        )
        create table ExitFeedback
		(
            intfeedbackId int identity(1,1) primary key,
            txtQuestion nvarchar(max) ,
            txtAnswer nvarchar(max),

        )
		create table EmployeeClearance
		(
			intid int identity(1,1) primary key,
			txtEmpNo varchar(8),
			flgIsHrApproved char(1),
			flgIsPmApproed   char(1),
			flgisDHApproved char(1),
			flgITClearance char(1),
			flgFinanceClearance char(1)

        )
		create table EmployeeExitdetails
		(
            txtEmployeeNo varchar(8) primary key,
            txtEmpEmailId varchar(255),
            txtEmpPersonalEmailid varchar(255),
            txtEmpContact char(13),
            dtSeperationDate datetime,
            dtLastWorkingDate datetime,
			intClearanceid int ,
            flgIsWithdrawn char(1),
            flgisClosed char(1),
            intfeedbackId int  FOREIGN KEY REFERENCES ExitFeedback(intfeedbackId)
        )



/*************
ALTER procedure [dbo].[spFetchAdminDetails]--'1025','HR'
(
	@txtEmpNo varchar(8),
	@txtRole varchar(20)

)
as
/************************
***Name :[dbo].[spFetchExitProgress]
***Desc : This sp is used to fetch the details for the Admin(Hr, PM & DH) to approve the request.
***Auth	 : "veeranjaneyulu"
***Date  : 02-Mar-2022

******************************
*** Change History

******************************
**S.no			Date               Author            Description
--------    ------------         ---------        ------------------------
** 1        02-Mar-2022			veera				Created the SP


****************************/
/************************
begin

begin try
    ---fetching employees under the admin
    IF(Upper(@txtRole)='HR')
    begin

        select	txtEmployeeNo ,
            txtEmpEmailId ,txtEmpPersonalEmailid ,
            txtEmpContact ,dtSeperationDate ,dtLastWorkingDate
        from EmployeeExitdetails exitdet
              where txtEmployeeNo in (
                          select emp.txtEmpno from [Employee]
                                emp join  EmployeeDetails empdet
                                on emp.txtEmpno =empdet.empno
                           where empdet.txtHREmpNo=@txtEmpNo)
                and isnull(flgIsWithdrawn,'0') ='0' and isnull(flgisClosed,'0') ='0'
    end
    else if(Upper(@txtRole)='PM')
      begin
          select	txtEmployeeNo ,
              txtEmpEmailId ,txtEmpPersonalEmailid ,
              txtEmpContact ,dtSeperationDate ,dtLastWorkingDate
          from EmployeeExitdetails exitdet
          where txtEmployeeNo in (
                          select emp.txtEmpno from [Employee]
                                emp join  EmployeeDetails empdet
                                on emp.txtEmpno =empdet.empno
                           where empdet.txtprojectManagerEmpNo=@txtEmpNo
                         )
          and isnull(flgIsWithdrawn,'0') ='0' and isnull(flgisClosed,'0') ='0'


      end
    else
      begin

          select	txtEmployeeNo ,
              txtEmpEmailId ,txtEmpPersonalEmailid ,
              txtEmpContact ,dtSeperationDate ,dtLastWorkingDate
          from EmployeeExitdetails exitdet
          where txtEmployeeNo in (
                          select emp.txtEmpno from [Employee]
                                emp join  EmployeeDetails empdet
                                on emp.txtEmpno =empdet.empno
                           where empdet.txtDeliveryHeadEmpNo=@txtEmpNo
                         )
          and isnull(flgIsWithdrawn,'0') ='0' and isnull(flgisClosed,'0') ='0'

      end




End try
begin catch

    select ERROR_MESSAGE() as txtstatus, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
end catch


end
************************/
/************************
 *

ALTER procedure [dbo].[spFetchEmployeeDetails]--'veeranjaneyulu'
(
	@txtEmpName varchar(255)

)
as
/************************
***Name :[dbo].[spFetchEmployeeDetails]
***Desc : This sp is used to fetch the Employee details for the exit process.
***Auth	 : ""
***Date  : 02-Mar-2022

******************************
*** Change History

******************************

******************************

****************************/
/******
begin

begin try
  If OBJECT_ID('tempdb..#tmpFinalEmpDetails') is not null drop table #tmpFinalEmpDetails
  Create table #tmpFinalEmpDetails
  (
    txtEmpNo varchar(8),
    txtEmpMailId varchar(255),
    dtDateofjoining datetime,
    [introle] int
    ,[txtJoblevel] varchar(8)
    ,[txtprojectManagerEmpNo] varchar(8)
    ,[txtDeliveryHeadEmpNo] varchar(8)
    ,[txtHREmpNo] varchar(8)
    ,[intDepartment] int,
    txtEmpRole varchar(8),
    txtPM varchar(255),
    txtDH varchar(255),
    txtHR varchar(255),
    txtDeptname varchar(255)
  )



    insert into #tmpFinalEmpDetails(txtEmpNo ,txtEmpMailId ,dtDateofjoining,introle,txtJoblevel,
                    txtprojectManagerEmpNo,txtDeliveryHeadEmpNo,
                    txtHREmpNo,intDepartment)
            Select emp.txtEmpno
                    ,emp.txtEmpEmailId
                    ,emp.dateOfJoining
                     ,[introle]
                      ,[txtJoblevel]
                      ,[txtprojectManagerEmpNo]
                      ,[txtDeliveryHeadEmpNo]
                      ,[txtHREmpNo]
                      ,[intDepartment]
                from [dbo].[Employee]  emp join [dbo].[EmployeeDetails] empdet
                    on emp.[txtEmpno]=empdet.empno where emp.[txtEmpEmailId]=@txtEmpName




      update  tmp set tmp.txtEmpRole=roles.txtRole,
              tmp.txtDeptname=dept.txtDepartment
                  from #tmpFinalEmpDetails tmp
                  join [dbo].[EmpRoles] roles  on tmp.introle=roles.id
                  join  EmpDepartment dept on dept.id=tmp.intDepartment

      update tmp set  tmp.txtpm= emp.txtEmpEmailId
            from #tmpFinalEmpDetails tmp join  [dbo].[Employee] emp
            on emp.[txtEmpno]= tmp.txtprojectManagerEmpNo

      update tmp set  tmp.txtDH= emp.txtEmpEmailId
            from #tmpFinalEmpDetails tmp join  [dbo].[Employee] emp
            on emp.[txtEmpno]= tmp.txtDeliveryHeadEmpNo
      update tmp set  tmp.txtHR= emp.txtEmpEmailId
            from #tmpFinalEmpDetails tmp join  [dbo].[Employee] emp
            on emp.[txtEmpno]= tmp.txtHREmpNo


    select tmp.txtEmpNo,tmp.txtEmpMailId,tmp.txtEmpRole,tmp.txtDeptname,tmp.dtDateofjoining,
        tmp.txtHR,tmp.txtPM,tmp.txtDH
    from #tmpFinalEmpDetails tmp


End try
begin catch

    select ERROR_MESSAGE() as txtmessage, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
end catch


end
**** */
/*********
 *
 *
 *
ALTER procedure [dbo].[spFetchExitProgress]--'1024'
(
	@txtEmpNo varchar(8)

)
as
/************************
***Name :[dbo].[spFetchExitProgress]
***Desc : This sp is used to fetch the progress of his exit process
***Auth	 : "veeranjaneyulu"
***Date  : 02-Mar-2022

******************************
*** Change History

******************************
**S.no			Date               Author            Description
--------    ------------         ---------        ------------------------
** 1        02-Mar-2022			veera				Created the SP


****************************/
/*******
begin
declare @txtEmployeeNo varchar(8), @idoc as int, @idoc1 as int
begin try


      select distinct
          empexit.txtEmployeeNo as txtEmpNo,
          empexit.txtEmpEmailId  as txtEmpId,
          empexit.txtEmpPersonalEmailid as txtEmpPersonalId ,
          empexit.txtEmpContact as txtcontact  ,
          empexit.dtSeperationDate as dtSeperationdate ,
          empexit.dtLastWorkingDate as dtLastWorkingDate,
          isNull(empclr.flgIsHrApproved,'0')  as flgIsHrApproved,
          isNull(empclr.flgIsPmApproed,'0') as  flgIsPmApproed ,
          isNull(empclr.flgisDHApproved,'0') as flgisDHApproved ,
          isNull(empclr.flgITClearance,'0') as flgITClearance  ,
          isNull(empclr.flgFinanceClearance,'0')  as flgFinanceClearance
      from EmployeeExitdetails empexit join EmployeeClearance empclr
            on empexit.txtEmployeeNo =empclr.txtEmpNo
                          where empexit.txtEmployeeNo=@txtEmpNo

End try
begin catch

    select ERROR_MESSAGE() as txtstatus, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
end catch


end


 *********/
/******
 *
  ALTER procedure [dbo].[spFetchFeedbackQuestions]

            as
            /************************
            ***Name :[dbo].[spFetchFeedbackQuestions]
            ***Desc : This sp is used to fetch the feedback questions for Employee  during  the exit process.
            ***Auth	 : ""
            ***Date  : 02-Mar-2022

            ******************************
            *** Change History

            ******************************

            ******************************

            ****************************/
           /***
                  begin

                begin try
                    select intId, txtQuestion,txtOptions from ExitQuestions


                End try
                begin catch

                        select ERROR_MESSAGE() as txtmessage, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
                end catch


            end

  *** */
 /************
  *
--[dbo].[spSaveEmployeeExitDetails]'<Data><Details txtEmployeeNumber="1024" txtEmpMailId="veer" txtEmpPersonalEmailid="veeranjaneyulu.j37@gmail.com" txtEmpContact="7032730227" dtSeparationDate="3/9/2022 12:00:00 AM" dtLastWorkingDate="5/8/2022 12:00:00 AM" /></Data>',
--'<Data><Details txtQuestion="what is the reason the resignation?" txtAnswer="NAA" /><Details txtQuestion="Do you have any other offer?" txtAnswer="testing" /><Details txtQuestion="What could be changed in the organaisation?" txtAnswer="Goood" /><Details txtQuestion="what is the reason the resignation?" txtAnswer="OOK" /></Data>'




ALTER procedure [dbo].[spSaveEmployeeExitDetails]--'1'
(
	@txtEmpData NText,
	@txtFeedbackdata Ntext

)
as
/************************
***Name :[dbo].[spSaveEmployeeExitDetails]
***Desc : This sp is used to save the employee details and feedback collected from employee during the exit process.
***Auth	 : "veeranjaneyulu"
***Date  : 02-Mar-2022

******************************
*** Change History

******************************
**S.no			Date               Author            Description
--------    ------------         ---------        ------------------------
** 1        02-Mar-2022			veera				Created the SP


****************************/
/*********
begin
declare @txtEmployeeNo varchar(8), @idoc as int, @idoc1 as int
begin try
  If OBJECT_ID('tempdb..#tmpEmployeeExitData') is not null drop table #tmpEmployeeExitData
  Create table #tmpEmployeeExitData
  (
      txtEmployeeNo varchar(8) ,
              txtEmpEmailId varchar(255),
              txtEmpPersonalEmailid varchar(255),
              txtEmpContact char(13),
              dtSeperationDate datetime,
              dtLastWorkingDate datetime,
              intClearanceid int ,
      intfeedbackId int
  )
  If OBJECT_ID('tempdb..#tmpEmployeeFeedbackData') is not null drop table #tmpEmployeeFeedbackData
  Create table #tmpEmployeeFeedbackData
  (
    txtQuestion varchar(255),
    txtAnswer varchar(255)
  )
  ----------------------  Inserting xml data into temp tables     ----------------------------------------
    Exec sp_xml_preparedocument @idoc output ,@txtEmpData
    insert into #tmpEmployeeExitData (txtEmployeeNo  ,
                    txtEmpEmailId ,txtEmpPersonalEmailid ,txtEmpContact,
                      dtSeperationDate , dtLastWorkingDate )
          Select  * from OPENXML(@idoc,'/Data/Details',1)
          with (
            txtEmployeeNumber varchar(8) ,
            txtEmpMailId varchar(255),
            txtEmpPersonalEmailid varchar(255),
            txtEmpContact char(13),
            dtSeparationDate datetime,
            dtLastWorkingDate datetime
          )

      Exec sp_xml_preparedocument @idoc1 output ,@txtFeedbackdata
      insert into #tmpEmployeeFeedbackData (txtQuestion ,txtAnswer )
      select * from OPENXML (@idoc1,'/Data/Details',1)
      with (txtQuestion varchar(255),
          txtAnswer varchar(255))

      Exec sp_xml_removedocument @idoc
      Exec sp_xml_removedocument  @idoc1
  ----------------------  Inserting xml data into temp tables     ----------------------------------------

    ------"EmployeeClearance"    insert employee number into the and get the id generated
        set @txtEmployeeNo= (select  txtEmployeeNo from #tmpEmployeeExitData)
          insert into  EmployeeClearance (txtEmpNo)
              select  @txtEmployeeNo

          insert into #tmpEmployeeExitData(intClearanceid)
              select clr.intid from EmployeeClearance clr
                        where clr.txtEmpNo=@txtEmployeeNo

      ----"EmployeeClearance"     id generation  ends

    -------------------------------------------Generating Feedback Id -----------------------------
    declare @JsonArray nvarchar
    set @JsonArray= (SELECT txtQuestion,txtAnswer from #tmpEmployeeFeedbackData for JSON PATH)
      DECLARE @IDs TABLE(intId INT)
          INSERT dbo.ExitFeedback(txtQuestion)
            OUTPUT inserted.intfeedbackId INTO @IDs(intId)
            select @JsonArray

           Insert into #tmpEmployeeExitData(intClearanceid)
           SELECT intId FROM @IDs;
    -------------------------------------------Generating Feedback Id  end-----------------------------
    insert into EmployeeExitdetails(txtEmployeeNo)
    Select	 @txtEmployeeNo
    update det set txtEmpEmailId= ex.txtEmpEmailId,txtEmpPersonalEmailid=ex.txtEmpPersonalEmailid,
        txtEmpContact=ex.txtEmpContact, dtSeperationDate=ex.dtSeperationDate,
        dtLastWorkingDate=ex.dtLastWorkingDate
        from #tmpEmployeeExitData ex  join EmployeeExitdetails
        det on det.txtEmployeeNo= ex.txtEmployeeNo


    --insert into EmployeeExitdetails(txtEmployeeNo,txtEmpEmailId ,txtEmpPersonalEmailid
    --								,txtEmpContact
    --								, dtSeperationDate , dtLastWorkingDate )
    --Select	 @txtEmployeeNo,tmp.txtEmpEmailId
    --		,tmp.txtEmpPersonalEmailid,tmp.txtEmpContact,
    --		tmp.dtSeperationDate,tmp.dtLastWorkingDate
    --from #tmpEmployeeExitData tmp

    if exists(select txtEmployeeNo  from EmployeeExitdetails where txtEmployeeNo=@txtEmployeeNo)
      begin
        select 'Successfully added the exit details' as txtstatus
      end
    else
      begin
        select 'Some Error Occured' as txtstatus
      end


End try
begin catch

    select ERROR_MESSAGE() as txtstatus, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
end catch


end

  * *********** */
 /****
  *
ALTER procedure [dbo].[spUpdatetheAdminAcceptance]
(
	@txtExitEmpNo varchar(8),
	@txtLoggedUserRole varchar(20)

)
as
/************************
***Name :[dbo].[spUpdatetheAdminAcceptance]
***Desc : This sp is used to update  approval acceptance from the admins (HR, PM and DH)
***Auth	 : "veeranjaneyulu"
***Date  : 02-Mar-2022

******************************
*** Change History

******************************
**S.no			Date               Author            Description
--------    ------------         ---------        ------------------------
** 1        02-Mar-2022			veera				Created the SP


****************************/
/****** *
begin

begin try
    ---fetching employees under the admin
    IF(@txtLoggedUserRole='HR')
    begin

        update EmployeeClearance set flgIsHrApproved='1' where txtEmpNo=@txtExitEmpNo


    end
    else if(@txtLoggedUserRole='PM')
      begin

        update EmployeeClearance set flgIsPmApproed='1' where txtEmpNo=@txtExitEmpNo

      end
    else
      begin
          update EmployeeClearance set flgisDHApproved='1' where txtEmpNo=@txtExitEmpNo
      end

      select 'Updated successfully' as txtStatus


End try
begin catch

    select ERROR_MESSAGE() as txtstatus, ERROR_LINE() txtline, ERROR_NUMBER()txtErrorNumber
end catch


end

  * ** */



/***********************insert queries for testing the scenarios
 *
 * insert into [Employee]
		select '1024','veer','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1025','veerqq','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1026','sarath','asss','7032730227',getdate(),'1','okkk'
		insert into [Employee]
		select '1027','sudhanshu','asss','7032730227',getdate(),'1','okkk'


		update [Employee] set txtEmpEmailId='veeranjaneyulu' where txtEmpno='1025'


		insert into EmpRoles
		select 'emp',1
		insert into EmpRoles
		select 'HR',1
		insert into EmpRoles
		select 'PM',1
		insert into EmpRoles
		select 'DH',1


		insert into EmpDepartment
		select 'Engineering'


		insert into EmployeeDetails
		select '1024','1','6L','1026','1027','1025',1

		insert into EmployeeDetails ---hR
		select '1025',2,'5L','','','',1

		insert into EmployeeDetails ---PM
		select '1026',3,'5B','','','',1

		insert into EmployeeDetails ---PM
		select '1027',4,'5B','','','',1




    insert into  [Employee]
			select '1206','testuser1@deloitte.com','India,Bangalore','7032730227',getdate(),'1','Employee confirmed'


			insert into  [Employee]
			select '1207','testuser@deloitte.com','India,Bangalore','7032730227',getdate(),'1','Employee confirmed'

			insert into  [Employee]
			select '2363','vveeranjaneyulu@deloitte.com','India,Bangalore','7032730227',getdate(),'1','Employee confirmed'

			insert into  [Employee]
			select '2389','sarathkv@deloitte.com','India,Bangalore','7032730227',getdate(),'1','Employee confirmed'

			insert into  [Employee]
			select '2467','sarathkv@deloitte.com','India,Bangalore','7032730227',getdate(),'1','Employee confirmed'


				insert into EmployeeDetails
				select '1207',1,'B6L','2363','2389','2467',1

				insert into EmployeeDetails
				select '1206',1,'B6L','2363','2389','2467',1

				insert into EmployeeDetails
				select '2363',1,'B6L','','','',1

				insert into EmployeeDetails
				select '2389',1,'B6L','','','',1

				insert into EmployeeDetails
				select '2467',1,'B6L','','','',1
 * ************************ */
