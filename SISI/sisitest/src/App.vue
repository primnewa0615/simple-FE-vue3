<script setup lang="ts">
import { RouterLink, RouterView} from 'vue-router'
import VueTableLite from 'vue3-table-lite/ts'
import { ref, onMounted,  } from 'vue'
import dataDummy from './dumy.json'
import { arrayBuffer } from 'stream/consumers';
import Modal from '@/components/Modal.vue'
import editIcon from '@/assets/images/edit.png'
import binIcon from '@/assets/images/bin.png'

const coloumn:any= ref([])
const datas:any=ref([])
const arr:any=ref([])
const company:any=ref("")
const status:any=ref("")
const date:any=ref("")
const searchKey:any=ref("")
const openErrorModal = ref(false)
const openAddModal = ref(false)
const warehouse:any = ref('')
const uom:any = ref('')
const brand:any = ref('')
const item:any = ref('')
const errorMessage:any = ref('')
const qty:any = ref(0)
const remark:any = ref('')
const rowAdd:any = ref([])
const options:any = ref([])
const coloumnAdd:any = ref([])

onMounted(async () => {
  

  coloumnAdd.value = [
  {
    label: "Warehouse",
    field: "warehouse",
    width: "3%",
    sortable: true,
    isKey: true,
  },
  {
    label: "Item Name",
    field: "item",
    width: "10%",
    sortable: true,
  },
  {
    label: "Quantity",
    field: "qty",
    width: "15%",
    sortable: true,
  },
  {
    label: "Brand",
    field: "brand",
    width: "15%",
    sortable: true,
  },
  {
    label: "UOM",
    field: "uom",
    width: "15%",
    sortable: true,
  },
  {
    label: "Remarks",
    field: "remark",
    width: "15%",
    sortable: true,
  },
  {
    label: "Actions",
    field: "actions",
    width: "15%",
    sortable: false,
    display: (row:any) => {
      return(
        '<div class="flex justify-center"><img src='+editIcon+'><img class="ml-2" src='+ binIcon+'></div>'
      )
    }
  },
]
  coloumn.value= [
  {
            label: "No",
            field: "no",
            width: "3%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Dokumen No",
            field: "dokno",
            width: "10%",
            sortable: true,
          },
          {
            label: "Date",
            field: "date",
            width: "15%",
            sortable: true,
          },
          {
            label: "Created By",
            field: "createdby",
            width: "15%",
            sortable: true,
          },
          {
            label: "Item Count",
            field: "itemcount",
            width: "15%",
            sortable: true,
          },
          {
            label: "Status",
            field: "status",
            width: "15%",
            sortable: true,
          },
          {
            label: "Actions",
            field: "actions",
            width: "15%",
            sortable: false,
            display: (row:any) => {
              return(
                '<div class="flex justify-center"><img src='+editIcon+'><img class="ml-2" src='+ binIcon+'></div>'
              )
            }
          },
          
  ]

  datas.value = dataDummy
  arr.value= dataDummy
})

const filterData = () => {
  let temp = []
  console.log(status.value)
  if(company.value !== '' && status.value != '' && date.value != ''){
    temp = datas.value.filter((a:any) =>{
      return a.company == company.value && a.status == status.value && a.date == date.value
    })

    arr.value = temp
  }else{
    openErrorModal.value= true;
    errorMessage.value='Silahkan Lengkapi Filter !'
  }
 
}

const reset = () => {
  arr.value=datas.value
}

const search = () => {
  let temp = datas.value.filter((a:any) =>{
    return a.dokno.toLowerCase() == searchKey.value.toLowerCase() || a.status.toLowerCase() == searchKey.value.toLowerCase() || a.createdby.toLowerCase() == searchKey.value.toLowerCase()
  })

  arr.value = temp
}

const closeErrorModal = () => {
  openErrorModal.value=false;
  rowAdd.value = []
  warehouse.value==''   
    qty.value== 0
    uom.value==''  
    item.value==''
    brand.value==''
}

const setOpenAddModal = () => {
  openAddModal.value = !openAddModal.value
  rowAdd.value = []
  warehouse.value==''   
    qty.value== 0
    uom.value==''  
    item.value==''
    brand.value==''
}    

const addToRow = () => {
  if(
    warehouse.value=='' ||  qty.value== 0||
    uom.value=='' || item.value==''||
    brand.value==''
  ){
    openErrorModal.value=true;
    errorMessage.value = "Silahkan lengkapi form!"
  }else{
    rowAdd.value.push({
      warehouse:warehouse.value,
      uom:uom.value,
      brand:brand.value,
      item:item.value,
      qty:qty.value,
      remark:remark.value,
    })

    warehouse.value==''   
    qty.value== 0
    uom.value==''  
    item.value==''
    brand.value==''
  }
  
  
}

const simpan = () =>{
    openErrorModal.value=true;
    errorMessage.value=JSON.stringify(rowAdd.value)
    
  }

</script>

<template >
   
    <div class="h-screen w-screen min-w- overflow-hidden absolute top-0 left-0 bg-gray-300 pt-2 text-roboto text-xs">
      <Modal style="background-color: rgba(0, 0, 0, 0.521);" v-if="openErrorModal" class="absolute top-0 right-0  w-full h-full z-20" >
        <div class="overlay layer flex flex-col items-center justify-start p-4">
          <p class="text-custOrange">{{ errorMessage }}</p>
          <br>
          <button class="p-2 rounded-lg mx-auto text-white bg-custGreen" @click="closeErrorModal">OK</button>
        </div>
      </Modal>
      <Modal style="background-color: rgba(0, 0, 0, 0.521);" v-if="openAddModal" class="absolute top-0 right-0  w-full h-full z-10 p-3" >
        <div class="overlay layer w-[1280px]  flex xl:w-[1200px] lg:w-[940px] md:w-[680px] h-[585px] flex-col items-center bg-white justify-start">
          <div class="absolute top-0 w-full h-16 flex justify-center bg-custBlue pt-3 px-4">
            <p class="text-white font-bold text-lg w-3/6 text-left">Atk Request</p>
            <div class="w-3/6 flex justify-end">
                <button  @click="setOpenAddModal" class="text-white font-bold text-lg w-8 h-8 bg-custOrange  rounded-md pb-2">X</button>
            </div>
          </div>
          <div class="w-full h-full overflow-y-auto overflow-x-hidden mt-12 flex flex-col bg-white items-center">
            <p class="text-base w-full py-4 border-gray-200 border-b-2 font-semibold">Atk Request Info</p>
            <br>
            <div class="w-full flex justify-center">
               <div class="w-6/12 mr-10">
                  <div class="w-full my-2">
                    <label class="font-semibold" for="warehouse">Warehouse<span class="text-red-500 ">*</span></label>
                    <select v-model="warehouse" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                      <option selected>Pilih Warehouse</option>
                      <option value="warehouse 1">Warehouse 1</option>
                      <option value="warehouse 2">Warehouse 2</option>
                      <option value="warehouse 3">Warehouse 3</option>
                      <option value="warehouse 4">Warehouse 4</option>
                    </select>
                  </div>
                  <div class="w-full my-2">
                    <label class="font-semibold" for="uom">UOM<span class="text-red-500 ">*</span></label>
                    <select v-model="uom" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                      <option selected>Pilih UOM</option>
                      <option value="uom 1">UOM 1</option>
                      <option value="uom 2">UOM 2</option>
                      <option value="uom 3">UOM 3</option>
                      <option value="uom 4">UOM 4</option>
                    </select>                  </div>
                  <div class="w-full my-2">
                    <label class="font-semibold" for="brand">Brand<span class="text-red-500 ">*</span></label>
                    <select v-model="brand" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                      <option selected>Pilih brand</option>
                      <option value="brand 1">Brand 1</option>
                      <option value="brand 2">Brand 2</option>
                      <option value="brand 3">Brand 3</option>
                      <option value="brand 4">Brand 4</option>
                    </select>                  </div>
               </div>
               <div class="w-6/12">
                  <div class="w-12/12 my-2">
                    <label class="font-semibold" for="itemname">Item Name<span class="text-red-500 ">*</span></label>
                    <select v-model="item" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                      <option selected>Pilih item</option>
                      <option value="item 1">Item 1</option>
                      <option value="item 2">Item 2</option>
                      <option value="item 3">Item 3</option>
                      <option value="item 4">Item 4</option>
                    </select>                  </div>
                  <div class="w-12/12 my-2">
                    <label class="font-semibold" for="quantity">Quantity<span class="text-red-500 ">*</span></label>
                    <input v-model="qty" name="quantity" type="number" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                  </div>
                  <div class="w-12/12 my-2">
                    <label class="font-semibold" for="remarks">Remarks</label>
                    <input v-model="remark" name="remarks" type="text" class="w-full p-2 border-gray-200 border-2 rounded-lg mt-2">
                  </div>
               </div>
            </div>
            <button @click="addToRow" class="bg-custBlue px-10 w-48 py-3 rounded-lg my-4 mx-6/12 text-white font-semibold text-center">Add</button>
            <VueTableLite
              class=" w-full rounded-t-lg"
                :is-fixed-first-column="true"
                :max-height="200"
                :is-static-mode="true"
                :columns="coloumnAdd"
                :rows="rowAdd"
                :total="rowAdd.length"
          
            ></VueTableLite>

            <button @click="simpan" class="bg-green-600 px-10 w-48 py-3 rounded-lg mt-0 mx-6/12 text-white font-semibold text-center">Simpan</button>
          </div>
        </div>
      </Modal>
      <div class="h-full bg-white rounded-t-xl border-t-4 border-custBlue overflow-y-auto">
        
        <!-- header -->
        <div class="flex w-full py-3 px-4">
          <div class="w-6/12 flex justify-start">
            <p class="font-bold text-lg">ATK Request</p>
          </div>
          <div class="w-6/12 flex justify-end">
              <button class="p-2 border-2 rounded-xl border-custGreen">
                <img src="@/assets/images/setting.png" >
              </button>
              <button @click="setOpenAddModal" class="py-2 px-3 border-2 rounded-xl text-white bg-custGreen flex justify-center mx-2 ">
                <img src="@/assets/images/add.png" class="mr-1 mt-1 h-3 w-3">
                <p class="text-sm">Add Item</p>
              </button>
              <button class=" w-11 border-2 rounded-xl border-custGreen flex justify-center">
                <img class="mt-3 h-4 w-4" src="@/assets/images/downloads.png" >
              </button>
          </div>
        </div>
        <!-- filter -->
        <div class="w-full p-2 flex text-sm xs:text-xs">
          <div class="w-8/12 flex justify-start">
            <select name="company" v-model="company" class="p-1 w-42 lg:w-42 sm:w-32 rounded-lg border-2 border-gray-300 mr-2">
              <option value="">Choose Company</option>
              <option value="SISI">SISI</option>
              <option value="AP2">AP2</option>
              <option value="AP1">AP1</option>
            </select>
            <select name="status" v-model="status" class="p-1 w-42 rounded-lg border-2 border-gray-300 mr-2">
              <option value="">Choose Status</option>
              <option value="Draft">Draft</option>
              <option value="Waiting Approval">Waiting Approval</option>
            </select>
            <input type="date" v-model="date" class="p-1 w-42 md:w-24 rounded-lg border-2 border-gray-300 mr-2">
            <button @click="filterData" class="flex bg-custGreen py-2 px-4 rounded-lg justify-center text-white mr-2">
              <img src="@/assets/images/filter.png"  class="mr-1 mt-1" alt="" srcset="">
              <p>Filter</p>
            </button>
            <button @click="reset" class="flex bg-custOrange py-2 px-4 rounded-lg justify-center text-white">
              <img src="@/assets/images/reload.png"  class="mr-2 " alt="" srcset="">
              <p>Reset</p>
            </button>
          </div>
        
          <div class="w-4/12 flex justify-end">
            <div class="border-2 rounded-lg border-gray-300 flex justify-start ">
              <img src="@/assets/images/search.png" class="w-4 h-4 ml-2 mt-2">
              <input type="text" class="p-1 w-8/12 focus:outline-0" v-model="searchKey" @keyup="search" placeholder="Search...">
            </div>
          </div>
        </div>

        <!-- table -->
        <VueTableLite
          class="m-2 mt-10 rounded-t-lg"
          :is-fixed-first-column="true"
          :max-height="400"
          :has-checkbox="true"
          :is-static-mode="true"
          :columns="coloumn"
          :rows="arr"
          :total="arr.length"
          :sortable="{order:'id',sort:'desc'}"
          
        ></VueTableLite>
      </div>
    </div>
</template>
<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #fff;
  background-color: #064c8a;
  border-color: #064c8a;
}

</style>
