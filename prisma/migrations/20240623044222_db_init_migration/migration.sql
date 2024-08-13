-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "nt" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" BIGSERIAL NOT NULL,
    "ide" INTEGER NOT NULL,
    "name" VARCHAR(50),
    "position" VARCHAR(50),
    "area" VARCHAR,
    "birthDate" VARCHAR(20),
    "birthPlace" VARCHAR(80),
    "birthState" VARCHAR(80),
    "curp" VARCHAR(40),
    "rfc" VARCHAR(40),
    "militaryCard" VARCHAR(40),
    "issstep" VARCHAR(20),
    "gender" VARCHAR(10),
    "maritalStatus" VARCHAR(10),
    "phone" VARCHAR(15),
    "mobile" VARCHAR(15),
    "email" VARCHAR(100),
    "institucionalMail" VARCHAR(100),
    "address" VARCHAR(80),
    "addressNumber" VARCHAR(11),
    "colony" VARCHAR(80),
    "population" VARCHAR(80),
    "postalCode" VARCHAR(11),
    "photo" VARCHAR(255),
    "degree" VARCHAR(80),
    "title" VARCHAR(80),
    "titleComplete" VARCHAR(80),
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartialTemplate" (
    "id" SERIAL NOT NULL,
    "nt" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "gender" VARCHAR(10),
    "position" VARCHAR(120),
    "total" INTEGER,
    "status" VARCHAR(50) DEFAULT 'pendiente',
    "year" VARCHAR(4),
    "period" VARCHAR(10),
    "templateId" BIGINT NOT NULL,

    CONSTRAINT "PartialTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" BIGSERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR(200),
    "partialtemplateId" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "educationalProgramId" BIGINT,
    "partialTemplateId" INTEGER,
    "activityDistribution" VARCHAR(120),
    "managmentType" VARCHAR(120),
    "stayType" VARCHAR(120),
    "activityName" VARCHAR(120),
    "gradeGroups" VARCHAR(50)[],
    "weeklyHours" INTEGER,
    "subtotalClassification" INTEGER,
    "numberStudents" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" BIGSERIAL NOT NULL,
    "state" VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    "areaId" BIGINT NOT NULL,
    "period" VARCHAR(50) NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "revisedById" INTEGER NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationalPrograms" (
    "id" BIGSERIAL NOT NULL,
    "abbreviation" VARCHAR(20),
    "description" VARCHAR(255),
    "areaId" BIGINT,

    CONSTRAINT "EducationalPrograms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" BIGSERIAL NOT NULL,
    "educationalProgramId" BIGINT NOT NULL,
    "weeklyHours" INTEGER,
    "totalHours" INTEGER,
    "monthPeriod" VARCHAR(10),
    "subjectName" VARCHAR(120),

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nt_key" ON "Users"("nt");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_nt_key" ON "Users"("id", "nt");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_id_key" ON "PersonalData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_ide_key" ON "PersonalData"("ide");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_email_key" ON "PersonalData"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_id_ide_key" ON "PersonalData"("id", "ide");

-- CreateIndex
CREATE UNIQUE INDEX "PartialTemplate_id_key" ON "PartialTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PartialTemplate_nt_key" ON "PartialTemplate"("nt");

-- CreateIndex
CREATE UNIQUE INDEX "PartialTemplate_templateId_key" ON "PartialTemplate"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_key" ON "Comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_partialtemplateId_key" ON "Comments"("partialtemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_educationalProgramId_key" ON "Activity"("educationalProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_partialTemplateId_key" ON "Activity"("partialTemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "Template_id_key" ON "Template"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Template_areaId_key" ON "Template"("areaId");

-- CreateIndex
CREATE UNIQUE INDEX "Area_id_key" ON "Area"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EducationalPrograms_id_key" ON "EducationalPrograms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_id_key" ON "Subject"("id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_nt_fkey" FOREIGN KEY ("nt") REFERENCES "PersonalData"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartialTemplate" ADD CONSTRAINT "PartialTemplate_nt_fkey" FOREIGN KEY ("nt") REFERENCES "PersonalData"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartialTemplate" ADD CONSTRAINT "PartialTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_partialtemplateId_fkey" FOREIGN KEY ("partialtemplateId") REFERENCES "PartialTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_partialTemplateId_fkey" FOREIGN KEY ("partialTemplateId") REFERENCES "PartialTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_educationalProgramId_fkey" FOREIGN KEY ("educationalProgramId") REFERENCES "EducationalPrograms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Users"("nt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_revisedById_fkey" FOREIGN KEY ("revisedById") REFERENCES "Users"("nt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationalPrograms" ADD CONSTRAINT "EducationalPrograms_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_educationalProgramId_fkey" FOREIGN KEY ("educationalProgramId") REFERENCES "EducationalPrograms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
